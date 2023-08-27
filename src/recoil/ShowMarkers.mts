import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';
import { getAppContainer } from '../util/getAppContainer.mjs';

export const rcShowMarkers = atom<boolean>({
  key: 'ShowMarkers',
  default: searchParams.boolean('markers', true),
  effects: [
    ({ onSet, getPromise }) => {
      const apply = (value: boolean) => {
        const selector = '.pnlm-render-container';
        const element = getAppContainer().querySelector(selector);
        if (element) {
          (element as HTMLElement).dataset.nomarker = value ? '0' : '1';
        }
      };
      onSet(apply);
      getPromise(rcShowMarkers).then(apply).catch(alert);
    },
  ],
});
