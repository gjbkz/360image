import * as fs from 'node:fs/promises';
import { ensure, isArray, isFiniteNumber, isString } from '@nlib/typing';
import type { Marker, ViewerConfig } from '../../src/util/app.mjs';
import { getElevation } from './getElevation.mjs';

export type PartialViewerConfig = Omit<ViewerConfig, 'filename' | 'location'>;

export const loadViewerConfig = async (
  jsonFileUrl: URL,
): Promise<PartialViewerConfig> => {
  const json = await fs.readFile(jsonFileUrl, 'utf8');
  const parsed = ensure(JSON.parse(json), {
    title: isString,
    markers: isArray.optional,
    latitude: isFiniteNumber,
    longitude: isFiniteNumber,
    altitude: isFiniteNumber,
    northYaw: isFiniteNumber,
    elevation: isFiniteNumber.optional,
    initPitch: isFiniteNumber.optional,
    initYaw: isFiniteNumber.optional,
    initHfov: isFiniteNumber.optional,
  });
  let updateJson = false;
  let { elevation, initPitch, initYaw, initHfov } = parsed;
  if (!isFiniteNumber(elevation)) {
    elevation = await getElevation(parsed);
    updateJson = true;
  }
  if (!isFiniteNumber(initPitch)) {
    initPitch = 0;
    updateJson = true;
  }
  if (!isFiniteNumber(initYaw)) {
    initYaw = 0;
    updateJson = true;
  }
  if (!isFiniteNumber(initHfov)) {
    initHfov = 30;
    updateJson = true;
  }
  const result: PartialViewerConfig = {
    ...parsed,
    elevation,
    initPitch,
    initYaw,
    initHfov,
    markers: [...filterMarkers(parsed.markers)],
  };
  if (updateJson) {
    await fs.writeFile(jsonFileUrl, JSON.stringify(result, null, 2));
  }
  return result;
};

const filterMarkers = function* (
  markers?: Iterable<unknown> | null,
): Generator<Marker> {
  if (markers) {
    let count = 0;
    for (const item of markers) {
      count += 1;
      const marker = ensure(item, {
        pitch: isFiniteNumber,
        yaw: isFiniteNumber,
        text: isString,
        id: isString.optional,
      });
      const id = marker.id || `hs-${count}`;
      yield { ...marker, id };
    }
  }
};
