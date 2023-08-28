import { atom, selector } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { rcViewer } from './Viewer.mjs';

export const rcOrientationMode = atom<boolean>({
  key: 'OrientationMode',
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

export const rcOrientationModeAvailabilty = selector<boolean>({
  key: 'OrientationModeAvailabilty',
  get: ({ get }) => {
    const viewer = get(rcViewer);
    return viewer.isOrientationSupported();
  },
});
