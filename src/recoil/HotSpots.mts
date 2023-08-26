import { atom, selectorFamily } from 'recoil';
import type * as app from '@gjbkz/360image';
import type * as pannellum from 'pannellum';
import { viewerConfig } from '../util/viewerConfig.mjs';

export const hotSpotElementMap = new WeakMap<app.HotSpot, HTMLElement>();
const createTooltipFunc = (element: HTMLElement, hotSpot: app.HotSpot) => {
  hotSpotElementMap.set(hotSpot, element);
};

export const rcHotSpots = atom<Array<pannellum.HotSpot<app.HotSpot>>>({
  key: 'HotSpots',
  default: viewerConfig.hotSpots.map((hotSpot) => ({
    ...hotSpot,
    createTooltipFunc,
    createTooltipArgs: hotSpot,
  })),
  effects: [
    ({ onSet }) => {
      onSet((hotSpots) => {
        for (const hotSpot of hotSpots) {
          hotSpot.createTooltipFunc = createTooltipFunc;
          hotSpot.createTooltipArgs = hotSpot;
        }
      });
    },
  ],
});

export const rcHotSpot = selectorFamily<app.HotSpot, string>({
  key: 'HotSpot',
  get:
    (id) =>
    ({ get }) => {
      const hotSpots = get(rcHotSpots);
      const hotSpot = hotSpots.find((hs) => hs.id === id);
      if (!hotSpot) {
        throw new Error(`NoSuchHotSpot:${id}`);
      }
      return hotSpot;
    },
});
