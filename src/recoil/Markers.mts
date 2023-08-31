import { DefaultValue, atom, selectorFamily } from 'recoil';
import type { Marker } from '../util/app.mjs';
import { createMarkerIcon } from '../util/icons.mjs';
import { dom } from '../util/dom.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { rcViewer } from './Viewer.mjs';
import { rcNorthYaw } from './NorthYaw.mjs';
import { rcEditMode } from './EditMode.mjs';

const createTooltipFunc = (element: HTMLElement, marker: Marker) => {
  element.append(dom('div', null, marker.text), createMarkerIcon());
};

const createTick = (element: HTMLElement, d: number) => {
  element.classList.add('tick');
  if (d % 90 === 0) {
    element.classList.add('main');
  } else if (d % 15 === 0) {
    element.classList.add('sub');
  }
  element.dataset.d = `${d}`;
};

export const rcMarkers = atom<Array<Marker>>({
  key: 'Markers',
  default: initialViewerConfig.markers,
  effects: [
    ({ onSet, getPromise }) => {
      const apply = async (markers: Array<Marker>) => {
        const [viewer, northYaw, editMode] = await Promise.all([
          getPromise(rcViewer),
          getPromise(rcNorthYaw),
          getPromise(rcEditMode),
        ]);
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
        const degStep = editMode ? 15 : 90;
        for (let deg = 0; deg < 360; deg += degStep) {
          viewer.addHotSpot({
            id: `${deg}deg`,
            yaw: northYaw + deg,
            pitch: 0,
            text: `${deg}`,
            createTooltipFunc: createTick,
            createTooltipArgs: deg,
          });
        }
      };
      onSet((markers) => apply(markers).catch(alert));
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
        if (!id) {
          return;
        }
        const [viewer, markers] = await Promise.all([
          getPromise(rcViewer),
          getPromise(rcMarkers),
        ]);
        const marker = markers.find((m) => m.id === id);
        if (!marker) {
          return;
        }
        viewer.lookAt(marker.pitch, marker.yaw, viewer.getHfov(), 600);
        const url = new URL(location.href);
        url.hash = id;
        history.replaceState(null, '', url);
      };
      onSet((markers) => apply(markers).catch(alert));
    },
  ],
});

export const rcMarker = selectorFamily<Marker, string | null>({
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
            newValue.id = `hs-${newMarkers.push(newValue)}`;
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
