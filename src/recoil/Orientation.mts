import { atom, selector } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { rcViewer } from './Viewer.mjs';

export const rcOrientation = atom<boolean>({
  key: 'Orientation',
  default: false,
  effects: [
    ({ onSet, getPromise }) => {
      const apply = alertError(async (enabled) => {
        const viewer = await getPromise(rcViewer);
        if (enabled) {
          viewer.startOrientation();
        } else {
          viewer.startOrientation();
        }
      });
      onSet(apply);
    },
  ],
});

export const rcOrientationAvailabilty = selector<boolean>({
  key: 'OrientationAvailabilty',
  get: ({ get }) => {
    const viewer = get(rcViewer);
    return viewer.isOrientationSupported();
  },
});
