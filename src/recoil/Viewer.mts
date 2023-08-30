import { atom, selector } from 'recoil';
import type { Viewer } from '../util/pannellum.mjs';
import { viewerPromise } from '../util/setup.mjs';
import { query } from '../util/dom.mjs';

export const rcViewer = atom<Viewer>({
  key: 'Viewer',
  default: viewerPromise,
});

export const rcRenderContainer = selector<HTMLElement>({
  key: 'RenderContainer',
  get: ({ get }) =>
    query('.pnlm-render-container', get(rcViewer).getContainer()),
});

export const rcViewerContainer = selector<HTMLElement>({
  key: 'ViewerContainer',
  get: ({ get }) => get(rcViewer).getContainer(),
});
