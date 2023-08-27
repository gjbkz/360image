import { atom } from 'recoil';

export const rcOrientation = atom<boolean>({
  key: 'Orientation',
  default: false,
});
