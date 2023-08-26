import { atom, selectorFamily } from 'recoil';
import type { Marker } from '../../@types/app.mjs';
import { viewerConfig } from '../util/viewerConfig.mjs';

export const rcMarkers = atom<Array<Marker>>({
  key: 'Markers',
  default: viewerConfig.markers,
});

export const rcMarker = selectorFamily<Marker, string>({
  key: 'Marker',
  get:
    (id) =>
    ({ get }) => {
      const markers = get(rcMarkers);
      const marker = markers.find((hs) => hs.id === id);
      if (!marker) {
        throw new Error(`NoSuchMarker:${id}`);
      }
      return marker;
    },
});
