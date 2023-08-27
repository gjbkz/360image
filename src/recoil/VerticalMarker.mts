import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';
import { getAppContainer } from '../util/getAppContainer.mjs';

export const rcVerticalMarker = atom<boolean>({
  key: 'VerticalMarker',
  default: searchParams.boolean('vertical', true),
  effects: [
    ({ onSet, getPromise }) => {
      const apply = (value: boolean) => {
        const selector = '.pnlm-render-container';
        const element = getAppContainer().querySelector(selector);
        if (element) {
          (element as HTMLElement).dataset.vertical = value ? '1' : '0';
        }
      };
      onSet(apply);
      getPromise(rcVerticalMarker).then(apply).catch(alert);
    },
  ],
});
