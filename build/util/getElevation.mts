import * as fs from 'node:fs/promises';
import { createTypeChecker, ensure, isFiniteNumber } from '@nlib/typing';
import { cacheDir } from './files.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { ignoreENOENT } from './ignoreENOENT.mjs';
import { RateLimitter } from './RateLimitter.mjs';

const elevationCacheDir = new URL('getElevation/', cacheDir);
const isAPIResponseItem = createTypeChecker('APIResponseItem', {
  elevation: isFiniteNumber,
});
const rateLimitter = new RateLimitter(1);

interface Props {
  latitude: number;
  longitude: number;
}

export const getElevation = async ({
  latitude,
  longitude,
}: Props): Promise<number> => {
  const startedAt = process.hrtime.bigint();
  const cacheDest = new URL(`${latitude}.${longitude}.json`, elevationCacheDir);
  let cached = await fs.readFile(cacheDest, 'utf8').catch(ignoreENOENT);
  if (!cached) {
    const result = await rateLimitter.enqueue(() =>
      fetch(
        `https://api.opentopodata.org/v1/aster30m?locations=${latitude},${longitude}`,
      ),
    );
    if (!result.ok) {
      throw new Error(`getElevation: ${result.status} ${result.statusText}`);
    }
    const response = ensure(await result.json(), {
      results: isAPIResponseItem.array,
    });
    cached = `${response.results[0].elevation}`;
    console.info(`getElevation: ${cached} (${latitude},${longitude})`);
    await fs.mkdir(elevationCacheDir, { recursive: true });
    await fs.writeFile(cacheDest, cached);
    console.info(`getElevation:done (${getElapsedMs(startedAt)})`);
  }
  return ensure(Number(cached), isFiniteNumber);
};
