import { DefaultValue, atom, selector } from 'recoil';
import { noop } from '../util/noop.mjs';
import type { Viewer } from '../util/pannellum.mjs';
import { initialViewerConfig, pitchStore, yawStore } from '../util/setup.mjs';
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

export const rc$Orientation = atom<Orientation>({
  key: 'Orientation',
  default: {
    pitch: pitchStore.get(),
    yaw: yawStore.get(),
  },
  effects: [
    ({ onSet }) => {
      let timerId = setTimeout(noop);
      const sync = (value: Orientation) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          pitchStore.set(value.pitch);
          yawStore.set(value.yaw);
        }, 500);
      };
      onSet(sync);
      return () => clearTimeout(timerId);
    },
    ({ setSelf, getPromise }) => {
      let reset = noop;
      const start = (viewer: Viewer) => {
        reset();
        reset = startWatch(viewer, () =>
          setSelf((current) => {
            const pitch = Math.min(
              Math.round(viewer.getPitch() * 1000) / 1000,
              -1,
            );
            const yaw = Math.round(viewer.getYaw() * 1000) / 1000;
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
      return () => reset();
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

export const rcOrientation = selector<Orientation>({
  key: 'SetOrientation',
  get: ({ get }) => get(rc$Orientation),
  set: ({ get }, orientation) => {
    if (orientation instanceof DefaultValue) {
      return;
    }
    const viewer = get(rcViewer);
    viewer.lookAt(orientation.pitch, orientation.yaw, viewer.getHfov(), 600);
  },
});
