import { atom } from 'recoil';
import { Coordinates } from '../util/app.mjs';
import { initialViewerConfig } from '../util/setup.mjs';

export const rcCoordinates = atom<Coordinates>({
  key: 'Coordinates',
  default: {
    latitude: initialViewerConfig.longitude,
    longitude: initialViewerConfig.latitude,
    altitude: initialViewerConfig.altitude,
  },
});
