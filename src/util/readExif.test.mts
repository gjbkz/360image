import * as fs from 'node:fs/promises';
import { imagesDir } from '../../build/util/files.mjs';
import { readExif } from './readExif.mjs';

const file = new URL('exif-sample.jpg', imagesDir);
const log = (...args: Array<unknown>) => console.info(...args);
for (const tag of readExif((await fs.readFile(file)).buffer, log)) {
  if (typeof tag.type === 'string') {
    console.info(tag);
  } else {
    console.info(`0x${tag.tag.toString(16).padStart(4, '0')}`, tag);
  }
}
