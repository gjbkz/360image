import * as fs from 'node:fs';
import type { GroupConfig } from '../../@types/app.mjs';

export const loadGroupConfig = (file: URL): GroupConfig => {
  const json = fs.readFileSync(file, 'utf8');
  return JSON.parse(json) as GroupConfig;
};
