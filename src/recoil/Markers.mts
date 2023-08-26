import { DefaultValue, atom, selectorFamily } from 'recoil';
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
  set:
    (id) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        return;
      }
      set(rcMarkers, (markers) => {
        const index = markers.findIndex((marker) => marker.id === id);
        const newMarkers = [...markers];
        if (index < 0) {
          if (newValue.text) {
            newMarkers.push(newValue);
          }
        } else if (newValue.text) {
          newMarkers[index] = newValue;
        } else {
          newMarkers.splice(index, 1);
        }
        return newMarkers;
      });
    },
});
