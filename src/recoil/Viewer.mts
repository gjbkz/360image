import { atom, selector } from 'recoil';
import type { Viewer } from '../util/pannellum.mjs';
import { viewerPromise } from '../util/setup.mjs';

export const rcViewer = atom<Viewer>({
  key: 'Viewer',
  default: viewerPromise,
});

export const rcViewerContainer = selector<HTMLElement>({
  key: 'ViewerContainer',
  get: ({ get }) => get(rcViewer).getContainer(),
});
