import { DefaultValue, atom, selectorFamily } from 'recoil';
import type { Marker } from '../util/app.mjs';
import { dom, svg } from '../util/dom.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { rcViewer } from './Viewer.mjs';

const createTooltipFunc = (element: HTMLElement, marker: Marker) => {
  element.append(
    dom('div', null, marker.text),
    svg('svg', { viewBox: '-5 -1 10 7' }, svg('path', { d: 'M-4 0L0 6L4 0Z' })),
  );
};

export const rcMarkers = atom<Array<Marker>>({
  key: 'Markers',
  default: initialViewerConfig.markers,
  effects: [
    ({ onSet, getPromise }) => {
      const apply = async (markers: Array<Marker>) => {
        const viewer = await getPromise(rcViewer);
        for (const hotSpot of viewer.getConfig().hotSpots.slice()) {
          viewer.removeHotSpot(hotSpot.id);
        }
        for (const marker of markers) {
          viewer.addHotSpot({
            ...marker,
            createTooltipFunc,
            createTooltipArgs: marker,
          });
        }
      };
      onSet((markers) => {
        apply(markers).catch(alert);
      });
      getPromise(rcMarkers).then(apply).catch(alert);
    },
  ],
});

export const rcFocusedMarker = atom<string | null>({
  key: 'FocusedMarker',
  default: null,
  effects: [
    ({ onSet, getPromise }) => {
      const apply = async (id: string | null) => {
        const [viewer, markers] = await Promise.all([
          getPromise(rcViewer),
          getPromise(rcMarkers),
        ]);
        const marker = markers.find((m) => m.id === id);
        if (!marker) {
          return;
        }
        viewer.lookAt(
          marker.pitch,
          marker.yaw,
          marker.hfov || viewer.getHfov(),
          600,
        );
        location.hash = `#${id}`;
      };
      onSet((markers) => {
        apply(markers).catch(alert);
      });
    },
  ],
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
