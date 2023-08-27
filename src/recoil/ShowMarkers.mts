import { atom } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { searchParams } from '../util/searchParams.mjs';
import { rcRenderContainer } from './Viewer.mjs';

export const rcShowMarkers = atom<boolean>({
  key: 'ShowMarkers',
  default: searchParams.boolean('markers', true),
  effects: [
    ({ onSet, getPromise }) => {
      const apply = alertError(async (value: boolean) => {
        const container = await getPromise(rcRenderContainer);
        container.dataset.nomarker = value ? '0' : '1';
      });
      onSet(apply);
      getPromise(rcShowMarkers).then(apply).catch(alert);
    },
  ],
});
