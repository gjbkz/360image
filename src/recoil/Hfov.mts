import { atom } from 'recoil';
import { noop } from '../util/noop.mjs';
import { Viewer } from '../util/pannellum.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { rcViewer } from './Viewer.mjs';

export const rcHfov = atom<number>({
  key: 'Hfov',
  default: initialViewerConfig.initHfov,
  effects: [
    ({ setSelf, getPromise }) => {
      let reset = noop;
      const start = (viewer: Viewer) => {
        reset();
        viewer.on('zoomchange', setSelf);
        reset = () => viewer.off('zoomchange', setSelf);
      };
      getPromise(rcViewer).then(start).catch(alert);
      return () => reset();
    },
  ],
});
