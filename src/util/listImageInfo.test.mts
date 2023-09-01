import { test } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs/promises';
import { isString } from '@nlib/typing';
import { imagesDir } from '../../build/util/files.mjs';
import { IFDTag, listImageInfo } from './listImageInfo.mjs';

test('listImageInfo', async () => {
  const file = new URL('exif-sample.jpg', imagesDir);
  const log = (...args: Array<unknown>) => console.info(...args);
  const jfifData: Record<string, number> = {};
  const exifData: Record<string, IFDTag['value'] | string> = {};
  for (const tag of listImageInfo((await fs.readFile(file)).buffer, log)) {
    console.info(tag);
    if (typeof tag.type === 'string') {
      jfifData[tag.type] = tag.value;
    } else {
      const key = `${tag.namespace || ''}${tag.tag}`;
      const { value } = tag;
      exifData[key] = isString.array(value) ? value.join('').trim() : value;
    }
  }
  assert.deepStrictEqual(jfifData, {});
  assert.deepStrictEqual(exifData, {
    '270': '',
    '271': 'NIKON',
    '272': 'COOLPIX P6000',
    '274': [1],
    '282': [300, 1],
    '283': [300, 1],
    '296': [2],
    '305': 'Nikon Transfer 1.1 W',
    '306': '2008:11:01 21:15:09',
    '531': [1],
    '34665': [268],
    '34853': [926],
    'gps1': 'N',
    'gps2': [43, 1, 28, 1, 639000000, 100000000],
    'gps3': 'E',
    'gps4': [11, 1, 52, 1, 534540000, 10000000],
    'gps5': [0],
    'gps7': [14, 1, 42, 1, 2903, 100],
    'gps8': '05',
    'gps16': '',
    'gps18': 'WGS-84',
    'gps29': '2008:10:23',
  });
});
