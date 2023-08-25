import { atom } from 'recoil';
import type * as app from '@gjbkz/360image';
import type * as pannellum from 'pannellum';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { fillHotSpot } from '../util/fillHotSpot.mjs';

export const rcHotSpots = atom<Array<pannellum.HotSpot<app.HotSpot>>>({
  key: 'HotSpots',
  default: viewerConfig.hotSpots.map(fillHotSpot),
});
