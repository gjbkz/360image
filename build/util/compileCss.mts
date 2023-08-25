import * as fs from 'node:fs/promises';
import * as sass from 'sass';
import { cacheDir } from './files.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { getHash } from './getHash.mjs';
import { ignoreENOENT } from './ignoreENOENT.mjs';

const cssCacheDir = new URL('compileCss/', cacheDir);

export const compileCss = async (file: URL) => {
  const startedAt = process.hrtime.bigint();
  const scssSource = await fs.readFile(file, 'utf8');
  const cacheDest = new URL(`${getHash(scssSource)}.css`, cssCacheDir);
  let cached = await fs.readFile(cacheDest, 'utf8').catch(ignoreENOENT);
  if (!cached) {
    const result = await sass.compileStringAsync(
      scssSource,
      /** https://sass-lang.com/documentation/js-api/interfaces/options/ */
      { style: 'compressed', charset: false },
    );
    cached = result.css;
    await fs.mkdir(cssCacheDir, { recursive: true });
    await fs.writeFile(cacheDest, cached);
    console.info(`compileCss:${file}:done (${getElapsedMs(startedAt)})`);
  }
  return cached;
};
