import { noop } from './noop.mjs';

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

export const readExif = function* (
  ab: ArrayBuffer,
  log: Logger = noop,
): Generator<JFIFData | IFDTag> {
  const r = new Reader(new DataView(ab), 0, false);
  {
    const startOfImage = r.read(2);
    if (startOfImage !== 0xffd8) {
      throw new Error(`InvalidSOI: 0x${startOfImage.toString(16)}`);
    }
    log(`SOI: 0x${startOfImage.toString(16)}`);
  }
  while (r.pos < r.view.byteLength) {
    const startOfSegment = r.pos;
    if (r.read(1) !== 0xff) {
      break;
    }
    const marker = r.read(1);
    log(`marker: 0x${marker.toString(16)}`);
    const length = r.read(2);
    log(`length: ${length}`);
    switch (marker) {
      case 0xe0: {
        yield* readJFIF(r.view, r.pos, log);
        break;
      }
      case 0xe1: {
        yield* readEXIF(r.view, r.pos, log);
        break;
      }
      case 0xe2:
        log('Unsupported:APP2');
        break;
      default:
        return;
    }
    r.pos = startOfSegment + length + 2;
  }
};

interface JFIFData {
  type: string;
  value: number;
}

const readJFIF = function* (
  view: DataView,
  posAfterLength: number,
  log: Logger,
): Generator<JFIFData> {
  const r = new Reader(view, posAfterLength, false);
  {
    const marker = r.read(4);
    if (marker !== 0x4a464946) {
      log(`InvalidJFIFMarker: 0x${marker.toString(16)}`);
      return;
    }
  }
  {
    const n = r.read(1);
    if (n !== 0x00) {
      log(`InvalidJFIFMarkerEnd: 0x${n.toString(16)}`);
    }
  }
  yield { type: 'Ver', value: r.read(2) };
  yield { type: 'U', value: r.read(1) };
  yield { type: 'Xd', value: r.read(2) };
  yield { type: 'Yd', value: r.read(2) };
  yield { type: 'Xt', value: r.read(1) };
  yield { type: 'Yt', value: r.read(1) };
};

interface Tag<T extends number, V> {
  namespace?: string;
  tag: number;
  type: T;
  count: number;
  value: V;
}

type IFDTag =
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

const readEXIF = function* (
  view: DataView,
  posAfterLength: number,
  log: Logger,
): Generator<IFDTag> {
  const r = new Reader(view, posAfterLength, false);
  {
    const marker = r.read(4);
    if (marker === 0x68747470) {
      log('Unsupported:XMP');
      return;
    }
    if (marker !== 0x45786966) {
      log(`InvalidEXIFMarker: 0x${marker.toString(16)}`);
      return;
    }
  }
  {
    const n = r.read(2);
    if (n !== 0x0000) {
      log(`InvalidEXIFMarkerEnd: 0x${n.toString(16)}`);
    }
  }
  const startOfTIFFHeader = r.pos;
  log(`startOfTIFFHeader: ${startOfTIFFHeader}`);
  {
    const byteOrder = r.read(2);
    if (byteOrder !== 0x4949 && byteOrder !== 0x4d4d) {
      throw new Error(`InvalidByteOrder: 0x${byteOrder.toString(16)}`);
    }
    log(`byteOrder 0x${byteOrder.toString(16)}`);
    r.littleEndian = byteOrder === 0x4949;
  }
  {
    const marker = r.read(2);
    if (marker !== 0x002a) {
      log(`InvalidTIFFMarker: 0x${marker.toString(16)}`);
      return;
    }
  }
  const readIFD = function* () {
    while (1) {
      const startOfIFD = r.pos;
      log(`startOfIFD: ${startOfIFD}`);
      const numberOfDirectoryEntries = r.read(2);
      log(`numberOfDirectoryEntries: ${numberOfDirectoryEntries}`);
      let previousTag = 0;
      for (let i = 0; i < numberOfDirectoryEntries; i++) {
        const tag = readTag(
          view,
          startOfTIFFHeader,
          startOfIFD,
          i,
          r.littleEndian,
          log,
        );
        if (tag && previousTag < tag.tag) {
          yield tag;
          previousTag = tag.tag;
        }
      }
      r.pos = startOfIFD + 2 + numberOfDirectoryEntries * 12;
      const nextIFDOffset = r.read(4);
      log(`nextIFDOffset: ${nextIFDOffset}`);
      if (nextIFDOffset === 0) {
        break;
      }
      r.pos += nextIFDOffset;
    }
  };
  r.pos = startOfTIFFHeader + r.read(4);
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
    r.pos = startOfTIFFHeader + offset;
    log(`extraIFD: ${r.pos}`);
    for (const tag of readIFD()) {
      yield { ...tag, namespace };
    }
  }
  log('readEXIF:end');
};

const readTag = (
  view: DataView,
  startOfHeader: number,
  startOfIFD: number,
  tagIndex: number,
  littleEndian: boolean,
  log: Logger,
): IFDTag | null => {
  const startOfTag = startOfIFD + 2 + tagIndex * 12;
  const tag = view.getUint16(startOfTag, littleEndian);
  const type = view.getUint16(startOfTag + 2, littleEndian);
  const count = view.getUint32(startOfTag + 4, littleEndian);
  let pos = startOfTag + 8;
  switch (type) {
    case 1: {
      // BYTE
      pos = getValueOffset(view, startOfHeader, pos, count, littleEndian);
      const value = [...ta(view, pos, 'uint8', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 2: {
      // ASCII
      pos = getValueOffset(view, startOfHeader, pos, count, littleEndian);
      const value = [
        ...toString(ta(view, pos, 'uint8', count, littleEndian), log),
      ];
      return { tag, type, count, value };
    }
    case 3: {
      // SHORT
      pos = getValueOffset(view, startOfHeader, pos, count * 2, littleEndian);
      const value = [...ta(view, pos, 'uint16', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 4: {
      // LONG
      pos = getValueOffset(view, startOfHeader, pos, count * 4, littleEndian);
      const value = [...ta(view, pos, 'uint32', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 5: {
      // RATIONAL
      pos = getValueOffset(view, startOfHeader, pos, count * 8, littleEndian);
      const value = [...ta(view, pos, 'uint32', count * 2, littleEndian)];
      return { tag, type, count, value };
    }
    case 6: {
      // SBYTE
      pos = getValueOffset(view, startOfHeader, pos, count, littleEndian);
      const value = [...ta(view, pos, 'int8', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 7: {
      // UNDEFINED
      pos = getValueOffset(view, startOfHeader, pos, count, littleEndian);
      const value = view.buffer.slice(pos, pos + count);
      return { tag, type, count, value };
    }
    case 8: {
      // SSHORT
      pos = getValueOffset(view, startOfHeader, pos, count * 2, littleEndian);
      const value = [...ta(view, pos, 'int16', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 9: {
      // SLONG
      pos = getValueOffset(view, startOfHeader, pos, count * 4, littleEndian);
      const value = [...ta(view, pos, 'int32', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 10: {
      // SRATIONAL
      pos = getValueOffset(view, startOfHeader, pos, count * 8, littleEndian);
      const value = [...ta(view, pos, 'int32', count * 2, littleEndian)];
      return { tag, type, count, value };
    }
    case 11: {
      // FLOAT
      pos = getValueOffset(view, startOfHeader, pos, count * 4, littleEndian);
      const value = [...ta(view, pos, 'float32', count, littleEndian)];
      return { tag, type, count, value };
    }
    case 12: {
      // DOUBLE
      pos = getValueOffset(view, startOfHeader, pos, count * 8, littleEndian);
      const value = [...ta(view, pos, 'float64', count, littleEndian)];
      return { tag, type, count, value };
    }
    default:
      log(`InvalidType: ${type}`);
  }
  return null;
};

const getValueOffset = (
  view: DataView,
  startOfHeader: number,
  offset: number,
  size: number,
  littleEndian: boolean,
) =>
  size <= 4 ? offset : startOfHeader + view.getUint32(offset, littleEndian);

const methods = {
  uint8: [1, 'getUint8'],
  uint16: [2, 'getUint16'],
  uint32: [4, 'getUint32'],
  int8: [1, 'getInt8'],
  int16: [2, 'getInt16'],
  int32: [4, 'getInt32'],
  float32: [4, 'getFloat32'],
  float64: [8, 'getFloat64'],
} as const;

const ta = function* (
  view: DataView,
  offset: number,
  type: keyof typeof methods,
  length: number,
  littleEndian: boolean,
) {
  const [step, method] = methods[type];
  for (let i = 0; i < length; i += step) {
    yield view[method](offset + i, littleEndian);
  }
};

const toString = function* (iterable: Iterable<number>, log: Logger) {
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
