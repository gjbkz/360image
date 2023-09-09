import { atom } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { createBooleanParameterStore } from '../util/ParameterStore.mjs';
import { rcRenderContainer } from './Viewer.mjs';

const store = createBooleanParameterStore('vertical', true, sessionStorage);
export const rcVerticalMarker = atom<boolean>({
  key: 'VerticalMarker',
  default: store.get(),
  effects: [
    ({ onSet }) => onSet(store.set),
    ({ onSet, getPromise }) => {
      const apply = alertError(async (value: boolean) => {
        const container = await getPromise(rcRenderContainer);
        container.dataset.vertical = value ? '1' : '0';
      });
      onSet(apply);
      getPromise(rcVerticalMarker).then(apply).catch(alert);
    },
  ],
});
