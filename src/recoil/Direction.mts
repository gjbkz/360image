import { atom } from 'recoil';
import { viewerConfig } from '../util/viewerConfig.mjs';

interface Direction {
  pitch: number;
  yaw: number;
  hfov: number;
}

export const rcDirection = atom<Direction>({
  key: 'Direction',
  default: {
    pitch: viewerConfig.initPitch,
    yaw: viewerConfig.initYaw,
    hfov: 30,
  },
});
