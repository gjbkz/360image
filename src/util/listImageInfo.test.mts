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
    if (typeof tag.type === 'string') {
      jfifData[tag.type] = tag.value;
    } else {
      switch (tag.tag) {
        case 40092:
        case 40094:
          break;
        default: {
          const key = `${tag.namespace || ''}${tag.tag}`;
          const { value } = tag;
          exifData[key] = isString.array(value) ? value.join('') : value;
        }
      }
    }
  }
  assert.deepStrictEqual(jfifData, {});
  assert.deepStrictEqual(exifData, {
    '270': 'DCIM\\PANORAMA\\100_0330\\DJI',
    '271': 'DJI',
    '272': 'FC7503',
    '274': [1],
    '282': [72, 1],
    '283': [72, 1],
    '296': [2],
    '305': 'v01.43.0005',
    '306': '2023:08:23 16:17:48',
    '531': [1],
    '34665': [182],
    '34853': [686],
    'gps1': 'N',
    'gps2': [40, 1, 48, 1, 367703, 10000],
    'gps3': 'W',
    'gps4': [74, 1, 4, 1, 323693, 10000],
    'gps5': [0],
    'gps6': [103945, 1000],
  });
});
