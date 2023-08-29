import * as fs from 'node:fs/promises';
import { imagesDir } from '../../build/util/files.mjs';
import { extractImageData } from './extractImageData.mjs';

const file = new URL('exif-sample.jpg', imagesDir);
console.info(await extractImageData(new Blob([await fs.readFile(file)])));
