import { atom } from 'recoil';
import type { Viewer } from '../util/pannellum.mjs';
import { alertError } from '../util/alertError.mjs';
import { dom } from '../util/dom.mjs';
import { noop } from '../util/noop.mjs';
import { searchParams } from '../util/searchParams.mjs';
import { createMarkerIcon } from '../util/createMarkerIcon.mjs';
import { rcViewer } from './Viewer.mjs';

export const rcShowCoordinates = atom<boolean>({
  key: 'ShowCoordinates',
  default: searchParams.boolean('coordinates', false),
  effects: [
    ({ onSet, getPromise }) => {
      let disable = noop;
      const apply = alertError(async (enabled) => {
        if (enabled) {
          const viewer = await getPromise(rcViewer);
          disable = enable(viewer);
        } else {
          disable();
        }
      });
      onSet(apply);
      getPromise(rcShowCoordinates).then(apply).catch(alert);
      return disable;
    },
  ],
});

// eslint-disable-next-line max-lines-per-function
const enable = (viewer: Viewer) => {
  const text = dom('div', null);
  const markerElement = dom(
    'div',
    { class: 'pnlm-coordinates' },
    text,
    createMarkerIcon(),
  );
  const parent = viewer.getContainer().querySelector('.pnlm-render-container');
  if (parent) {
    parent.append(markerElement);
  }
  let timerId = requestAnimationFrame(noop);
  const sync = () => {
    const yaw = viewer.getYaw().toFixed(2);
    const pitch = viewer.getPitch().toFixed(2);
    text.textContent = `${yaw}, ${pitch}`;
  };
  const watch = () => {
    cancelAnimationFrame(timerId);
    const onRendering = () => {
      timerId = requestAnimationFrame(onRendering);
      sync();
    };
    onRendering();
  };
  const track = () => {
    cancelAnimationFrame(timerId);
    let lastChangedAt = Infinity;
    let previousYaw = Infinity;
    let previousPitch = Infinity;
    const onRendering = (timeStamp: number) => {
      timerId = requestAnimationFrame(onRendering);
      const yaw = viewer.getYaw();
      const pitch = viewer.getPitch();
      if (yaw === previousYaw && pitch === previousPitch) {
        if (100 < timeStamp - lastChangedAt) {
          cancelAnimationFrame(timerId);
        }
      } else {
        sync();
        previousYaw = yaw;
        previousPitch = pitch;
        lastChangedAt = timeStamp;
      }
    };
    timerId = requestAnimationFrame(onRendering);
  };
  viewer.on('mousedown', watch);
  viewer.on('mouseup', track);
  viewer.on('touchstart', watch);
  viewer.on('touchend', track);
  viewer.on('animatefinished', sync);
  addEventListener('pointerup', track);
  sync();
  return () => {
    markerElement.remove();
    viewer.off('mousedown', watch);
    viewer.off('mouseup', track);
    viewer.off('touchstart', watch);
    viewer.off('touchend', track);
    viewer.off('animatefinished', sync);
    removeEventListener('pointerup', track);
  };
};
