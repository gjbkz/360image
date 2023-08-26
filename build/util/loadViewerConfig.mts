import * as fs from 'node:fs';
import { ensure, isArray, isFiniteNumber, isString } from '@nlib/typing';
import type { HotSpot, ViewerConfig } from '../../@types/app.mjs';
import { imagesDir } from './files.mjs';

export const loadViewerConfig = (jsonFileUrl: URL): ViewerConfig => {
  const json = fs.readFileSync(jsonFileUrl, 'utf8');
  const parsed = ensure(JSON.parse(json), {
    title: isString,
    author: isString.optional,
    hotSpots: isArray.optional,
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
    hotSpots: [...filterHotSpots(parsed.hotSpots)],
    path: jsonFileUrl.pathname.slice(imagesDir.pathname.length, -5),
  };
};

const filterHotSpots = function* (
  hotSpots?: Iterable<unknown> | null,
): Generator<HotSpot> {
  if (hotSpots) {
    let count = 0;
    for (const item of hotSpots) {
      count += 1;
      const hotSpot = ensure(item, {
        pitch: isFiniteNumber,
        yaw: isFiniteNumber,
        text: isString,
        id: isString.optional,
      });
      const id = hotSpot.id || `hs-${count}`;
      yield { ...hotSpot, id };
    }
  }
};
