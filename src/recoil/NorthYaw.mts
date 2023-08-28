import { atom } from 'recoil';
import { initialViewerConfig } from '../util/setup.mjs';

export const rcNorthYaw = atom<number>({
  key: 'NorthYaw',
  default: initialViewerConfig.northYaw,
});
