import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';
import { alertError } from '../util/alertError.mjs';
import { query } from '../util/dom.mjs';
import { rcViewerContainer } from './Viewer.mjs';

export const rcVerticalMarker = atom<boolean>({
  key: 'VerticalMarker',
  default: searchParams.boolean('vertical', true),
  effects: [
    ({ onSet, getPromise }) => {
      const apply = alertError(async (value: boolean) => {
        const container = await getPromise(rcViewerContainer);
        const element = query('.pnlm-render-container', container);
        element.dataset.vertical = value ? '1' : '0';
      });
      onSet(apply);
      getPromise(rcVerticalMarker).then(apply).catch(alert);
    },
  ],
});
