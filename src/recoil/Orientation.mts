import { DefaultValue, atom } from 'recoil';
import type { Viewer } from '../util/pannellum.mjs';
import { noop } from '../util/noop.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { rcViewer } from './Viewer.mjs';

interface Orientation {
  pitch: number;
  yaw: number;
}

export const rcInitialOrientation = atom<Orientation>({
  key: 'InitialOrientation',
  default: {
    pitch: initialViewerConfig.initPitch,
    yaw: initialViewerConfig.initYaw,
  },
});

export const rcOrientation = atom<Orientation>({
  key: 'Orientation',
  default: {
    pitch: initialViewerConfig.initPitch,
    yaw: initialViewerConfig.initYaw,
  },
  effects: [
    ({ setSelf, getPromise }) => {
      let reset = noop;
      const start = (viewer: Viewer) => {
        reset = startWatch(viewer, () =>
          setSelf((current) => {
            const pitch = viewer.getPitch();
            const yaw = viewer.getYaw();
            if (
              current instanceof DefaultValue ||
              current.pitch !== pitch ||
              current.yaw !== yaw
            ) {
              return { pitch, yaw };
            }
            return current;
          }),
        );
      };
      getPromise(rcViewer).then(start).catch(alert);
      return reset;
    },
  ],
});

const startWatch = (viewer: Viewer, sync: () => void) => {
  let timerId = requestAnimationFrame(noop);
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
    viewer.off('mousedown', watch);
    viewer.off('mouseup', track);
    viewer.off('touchstart', watch);
    viewer.off('touchend', track);
    viewer.off('animatefinished', sync);
    removeEventListener('pointerup', track);
  };
};
