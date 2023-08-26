import {
  createTypeChecker,
  ensure,
  isFiniteNumber,
  isString,
} from '@nlib/typing';
import type { HotSpot, ViewerConfig } from '../../@types/app.mjs';

const isHotSpot = createTypeChecker<HotSpot>('HotSpot', {
  pitch: isFiniteNumber,
  yaw: isFiniteNumber,
  text: isString,
  id: isString,
});

const isViewerConfig = createTypeChecker<ViewerConfig>('ViewerConfig', {
  path: isString,
  title: isString,
  author: isString.optional,
  hotSpots: isHotSpot.array,
  latitude: isFiniteNumber.optional,
  longitude: isFiniteNumber.optional,
  altitude: isFiniteNumber.optional,
  initPitch: isFiniteNumber,
  initYaw: isFiniteNumber,
});

const selector = 'script#viewer-config';
const viewerConfigNode = document.querySelector(selector);
if (!viewerConfigNode) {
  throw new Error(`NoSuchNode: ${selector}`);
}
export const viewerConfig = ensure(
  JSON.parse(`${viewerConfigNode.textContent}`),
  isViewerConfig,
);
