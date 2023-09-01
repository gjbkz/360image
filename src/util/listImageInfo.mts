import { noop } from './noop.mjs';

interface JFIFData {
  type: string;
  value: number;
}

interface Tag<T extends number, V> {
  namespace?: string;
  tag: number;
  type: T;
  count: number;
  value: V;
}

export type IFDTag =
  | Tag<1, Array<number>>
  | Tag<2, Array<string>>
  | Tag<3, Array<number>>
  | Tag<4, Array<number>>
  | Tag<5, Array<number>>
  | Tag<6, Array<number>>
  | Tag<7, ArrayBuffer>
  | Tag<8, Array<number>>
  | Tag<9, Array<number>>
  | Tag<10, Array<number>>
  | Tag<11, Array<number>>
  | Tag<12, Array<number>>;

type Logger = (...args: Array<unknown>) => void;

class Reader {
  public view: DataView;
  public pos: number;
  public littleEndian: boolean;
  public constructor(view: DataView, pos: number, littleEndian: boolean) {
    this.view = view;
    this.pos = pos;
    this.littleEndian = littleEndian;
  }
  public read(size: number): number {
    const currentPos = this.pos;
    this.pos += size;
    switch (size) {
      case 1:
        return this.view.getUint8(currentPos);
      case 2:
        return this.view.getUint16(currentPos, this.littleEndian);
      case 4:
        return this.view.getUint32(currentPos, this.littleEndian);
      default:
        throw new Error(`InvalidSize: ${size}`);
    }
  }
}

const test = (
  actual: number,
  expected: Array<number>,
  name: string,
  log: Logger,
) => {
  if (!expected.includes(actual)) {
    throw new Error(`Invalid${name}: 0x${actual.toString(16)}`);
  }
  log(`${name}: 0x${actual.toString(16)}`);
  return actual;
};

export const listImageInfo = function* (
  ab: ArrayBuffer,
  log: Logger = noop,
): Generator<JFIFData | IFDTag> {
  const r = new Reader(new DataView(ab), 0, false);
  test(r.read(2), [0xffd8], 'SOI', log);
  while (r.pos < r.view.byteLength) {
    const segmentOffset = r.pos;
    if (r.read(1) !== 0xff) {
      return;
    }
    const marker = r.read(1);
    log(`Marker: 0x${marker.toString(16)}`);
    const segmentLength = r.read(2);
    log(`segmentLength: ${segmentLength}`);
    switch (marker) {
      case 0xe0:
        yield* readJFIF(r, log);
        break;
      case 0xe1:
        yield* readEXIF(r, log);
        break;
      default:
        return;
    }
    r.pos = segmentOffset + segmentLength + 2;
  }
};

const readJFIF = function* (r: Reader, log: Logger): Generator<JFIFData> {
  r.littleEndian = false;
  test(r.read(4), [0x4a464946], 'JFIFMarker', log);
  test(r.read(1), [0x00], 'JFIFMarkerSuffix', log);
  yield { type: 'Ver', value: r.read(2) };
  yield { type: 'U', value: r.read(1) };
  yield { type: 'Xd', value: r.read(2) };
  yield { type: 'Yd', value: r.read(2) };
  yield { type: 'Xt', value: r.read(1) };
  yield { type: 'Yt', value: r.read(1) };
};

const readEXIF = function* (r: Reader, log: Logger): Generator<IFDTag> {
  r.littleEndian = false;
  const marker = test(r.read(4), [0x68747470, 0x45786966], 'EXIFMarker', log);
  if (marker === 0x68747470) {
    log('Unsupported: XMP');
    return;
  }
  test(r.read(2), [0x0000], 'EXIFMarkerSuffix', log);
  const tiffHeaderOffset = r.pos;
  log(`tiffHeaderOffset: ${tiffHeaderOffset}`);
  r.littleEndian =
    test(r.read(2), [0x4949, 0x4d4d], 'ByteOrder', log) === 0x4949;
  test(r.read(2), [0x002a], 'TIFFMarker', log);
  const readIFD = function* () {
    while (1) {
      const ifdOffset = r.pos;
      log(`ifdOffset: ${ifdOffset}`);
      const numberOfEntries = r.read(2);
      log(`numberOfEntries: ${numberOfEntries}`);
      let previousTag = 0;
      let aborted = false;
      for (let i = 0; i < numberOfEntries; i++) {
        r.pos = ifdOffset + 2 + i * 12;
        const tag = readTag(r, tiffHeaderOffset, log);
        if (tag && previousTag < tag.tag) {
          yield tag;
          previousTag = tag.tag;
        } else {
          log(`aborted at tag #${i}`);
          aborted = true;
          break;
        }
      }
      if (aborted) {
        break;
      }
      r.pos = ifdOffset + 2 + numberOfEntries * 12;
      const nextOffset = r.read(4);
      log(`nextOffset: ${nextOffset}`);
      if (nextOffset === 0) {
        break;
      }
      r.pos += nextOffset;
    }
  };
  r.pos = tiffHeaderOffset + r.read(4);
  const extraIFDOffsets = new Map<string, number>();
  for (const tag of readIFD()) {
    yield tag;
    if (tag.tag === 0x8825 && tag.type === 4 && tag.count === 1) {
      extraIFDOffsets.set('gps', tag.value[0]);
    } else if (tag.tag === 0xa005 && tag.type === 4 && tag.count === 1) {
      extraIFDOffsets.set('interoperability', tag.value[0]);
    }
  }
  for (const [namespace, offset] of extraIFDOffsets) {
    r.pos = tiffHeaderOffset + offset;
    log(`extraIFD: ${namespace} ${r.pos}`);
    for (const tag of readIFD()) {
      yield { ...tag, namespace };
    }
  }
  log('readEXIF:end');
};

const readTag = (r: Reader, startOfHeader: number, log: Logger) => {
  const tag = r.read(2);
  const type = r.read(2) as IFDTag['type'];
  const count = r.read(4);
  const value = getValue(r, startOfHeader, type, count, log);
  return value ? ({ tag, type, count, value } as IFDTag) : null;
};

const getValue = <T extends IFDTag>(
  r: Reader,
  startOfHeader: number,
  type: T['type'],
  count: number,
  log: Logger,
): T['value'] | null => {
  switch (type) {
    case 1: /* BYTE */ {
      r.pos = getValueOffset(r, startOfHeader, count);
      return [...toNumbers(r, 'ui8', count)];
    }
    case 2: /* ASCII */ {
      r.pos = getValueOffset(r, startOfHeader, count);
      return [...toStrings(toNumbers(r, 'ui8', count), log)];
    }
    case 3: /* SHORT */ {
      r.pos = getValueOffset(r, startOfHeader, count * 2);
      return [...toNumbers(r, 'ui16', count)];
    }
    case 4: /* LONG */ {
      r.pos = getValueOffset(r, startOfHeader, count * 4);
      return [...toNumbers(r, 'ui32', count)];
    }
    case 5: /* RATIONAL */ {
      r.pos = getValueOffset(r, startOfHeader, count * 8);
      return [...toNumbers(r, 'ui32', count * 2)];
    }
    case 6: /* SBYTE */ {
      r.pos = getValueOffset(r, startOfHeader, count);
      return [...toNumbers(r, 'i8', count)];
    }
    case 7: /* UNDEFINED */ {
      const pos = getValueOffset(r, startOfHeader, count);
      return r.view.buffer.slice(pos, pos + count);
    }
    case 8: /* SSHORT */ {
      r.pos = getValueOffset(r, startOfHeader, count * 2);
      return [...toNumbers(r, 'i16', count)];
    }
    case 9: /* SLONG */ {
      r.pos = getValueOffset(r, startOfHeader, count * 4);
      return [...toNumbers(r, 'i32', count)];
    }
    case 10: /* SRATIONAL */ {
      r.pos = getValueOffset(r, startOfHeader, count * 8);
      return [...toNumbers(r, 'i32', count * 2)];
    }
    case 11: /* FLOAT */ {
      r.pos = getValueOffset(r, startOfHeader, count * 4);
      return [...toNumbers(r, 'f32', count)];
    }
    case 12: /* DOUBLE */ {
      r.pos = getValueOffset(r, startOfHeader, count * 8);
      return [...toNumbers(r, 'f64', count)];
    }
    default:
      log(`InvalidType: ${type}`);
  }
  return null;
};

const getValueOffset = (r: Reader, startOfHeader: number, size: number) =>
  size <= 4 ? r.pos : startOfHeader + r.read(4);

const methods = {
  ui8: [1, 'getUint8'],
  ui16: [2, 'getUint16'],
  ui32: [4, 'getUint32'],
  i8: [1, 'getInt8'],
  i16: [2, 'getInt16'],
  i32: [4, 'getInt32'],
  f32: [4, 'getFloat32'],
  f64: [8, 'getFloat64'],
} as const;

const toNumbers = function* (
  { view, pos, littleEndian }: Reader,
  type: keyof typeof methods,
  length: number,
) {
  const [unit, method] = methods[type];
  for (let i = 0; i < length; i++) {
    yield view[method](pos + i * unit, littleEndian);
  }
};

const toStrings = function* (iterable: Iterable<number>, log: Logger) {
  let buffer = '';
  for (const asciiCharCode of iterable) {
    if (asciiCharCode === 0) {
      yield buffer;
      buffer = '';
    } else {
      buffer += String.fromCharCode(asciiCharCode);
    }
  }
  if (buffer) {
    log(`UnterminatedString: ${buffer}`);
  }
};
