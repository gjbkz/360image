import * as fs from 'node:fs';
import type * as app from '@gjbkz/360image';

export const loadGroupConfig = (file: URL): app.GroupConfig => {
  const json = fs.readFileSync(file, 'utf8');
  return JSON.parse(json) as app.GroupConfig;
};
