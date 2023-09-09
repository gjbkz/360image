import { atom } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { createBooleanParameterStore } from '../util/ParameterStore.mjs';
import { rcRenderContainer } from './Viewer.mjs';

const store = createBooleanParameterStore('markers', true);
export const rcShowMarkers = atom<boolean>({
  key: 'ShowMarkers',
  default: store.get(),
  effects: [
    ({ onSet }) => onSet(store.set),
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
