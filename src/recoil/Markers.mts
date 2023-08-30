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
        for (let i = 0; i < 4; i++) {
          const marker = {
            id: 'NESW'[i],
            yaw: northYaw + i * 90,
            pitch: 0,
            text: '北東南西'[i],
          };
          viewer.addHotSpot({
            ...marker,
            createTooltipFunc,
            createTooltipArgs: marker,
          });
          if (editMode) {
            for (let j = 1; j < 6; j += 1) {
              const deg = i * 90 + j * 15;
              const marker = {
                id: `${deg}deg`,
                yaw: northYaw + deg,
                pitch: 0,
                text: `${deg}`,
              };
              viewer.addHotSpot({
                ...marker,
                createTooltipFunc,
                createTooltipArgs: marker,
              });
            }
          }
        }
        if (editMode) {
          const marker = {
            id: 'O',
            yaw: 0,
            pitch: -90,
            text: '',
          };
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
      onSet((markers) => {
        apply(markers).catch(alert);
      });
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
