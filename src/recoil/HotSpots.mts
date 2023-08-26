import { atom, selectorFamily } from 'recoil';
import type * as app from '../../@types/app.mjs';
import type * as pannellum from '../../@types/pannellum.mjs';
import { viewerConfig } from '../util/viewerConfig.mjs';

const createTooltipFunc = (element: HTMLElement, hotSpot: app.HotSpot) => {
  element.dataset.id = hotSpot.id;
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
