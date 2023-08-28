import * as fs from 'node:fs';
import * as stream from 'node:stream';
import { imagesDir } from '../../build/util/files.mjs';
import { readExif } from './readExif.mjs';

const toReadable = (input: stream.Readable): ReadableStream<Uint8Array> => {
  if (input instanceof ReadableStream) {
    return input;
  }
  if (input instanceof Blob) {
    return input.stream();
  }
  return new ReadableStream<Uint8Array>({
    start(controller) {
      input.pipe(
        new stream.Writable({
          write(chunk: Buffer, _encoding, callback) {
            controller.enqueue(new Uint8Array(chunk));
            callback();
          },
          final(callback) {
            controller.close();
            callback();
          },
        }),
      );
    },
  });
};

const file = new URL('exif-sample.jpg', imagesDir);
const result = new Map<string, string>();
for await (const item of readExif(toReadable(fs.createReadStream(file)))) {
  result.set(item[0], item[1]);
}
console.info(result);
