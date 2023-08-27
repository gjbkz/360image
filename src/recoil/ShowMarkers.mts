import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';
import { alertError } from '../util/alertError.mjs';
import { query } from '../util/dom.mjs';
import { rcViewerContainer } from './Viewer.mjs';

export const rcShowMarkers = atom<boolean>({
  key: 'ShowMarkers',
  default: searchParams.boolean('markers', true),
  effects: [
    ({ onSet, getPromise }) => {
      const apply = alertError(async (value: boolean) => {
        const container = await getPromise(rcViewerContainer);
        const element = query('.pnlm-render-container', container);
        element.dataset.nomarker = value ? '0' : '1';
      });
      onSet(apply);
      getPromise(rcShowMarkers).then(apply).catch(alert);
    },
  ],
});
