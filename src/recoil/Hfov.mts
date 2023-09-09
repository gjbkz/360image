import { atom } from 'recoil';
import { noop } from '../util/noop.mjs';
import { Viewer } from '../util/pannellum.mjs';
import { hfovStore, initialViewerConfig } from '../util/setup.mjs';
import { rcViewer } from './Viewer.mjs';

export const rcHfov = atom<number>({
  key: 'Hfov',
  default: initialViewerConfig.initHfov,
  effects: [
    ({ onSet }) => {
      let timerId = setTimeout(noop);
      const sync = (value: number) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => hfovStore.set(value), 500);
      };
      onSet(sync);
      return () => clearTimeout(timerId);
    },
    ({ setSelf, getPromise }) => {
      let reset = noop;
      const start = (viewer: Viewer) => {
        reset();
        viewer.on('zoomchange', setSelf);
        reset = () => viewer.off('zoomchange', setSelf);
        setSelf(viewer.getHfov());
      };
      getPromise(rcViewer).then(start).catch(alert);
      return () => reset();
    },
  ],
});
