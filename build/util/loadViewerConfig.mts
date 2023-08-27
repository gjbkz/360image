import * as fs from 'node:fs';
import { ensure, isArray, isFiniteNumber, isString } from '@nlib/typing';
import type { Marker, ViewerConfig } from '../../src/util/app.mjs';

export const loadViewerConfig = (
  jsonFileUrl: URL,
): Omit<ViewerConfig, 'filename'> => {
  const json = fs.readFileSync(jsonFileUrl, 'utf8');
  const parsed = ensure(JSON.parse(json), {
    title: isString,
    author: isString.optional,
    markers: isArray.optional,
    latitude: isFiniteNumber.optional,
    longitude: isFiniteNumber.optional,
    altitude: isFiniteNumber.optional,
    initPitch: isFiniteNumber.optional,
    initYaw: isFiniteNumber.optional,
  });
  return {
    ...parsed,
    initPitch: parsed.initPitch || 0,
    initYaw: parsed.initYaw || 0,
    markers: [...filterMarkers(parsed.markers)],
  };
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
        hfov: isFiniteNumber.optional,
        text: isString,
        id: isString.optional,
      });
      const id = marker.id || `hs-${count}`;
      yield { ...marker, id };
    }
  }
};
