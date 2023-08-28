import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';

const name = 'edit';
export const rcEditMode = atom<boolean>({
  key: 'EditMode',
  default: searchParams.boolean(name, false),
  effects: [
    ({ onSet }) => {
      const apply = (value: boolean) => {
        const url = new URL(location.href);
        const params = url.searchParams;
        if (value) {
          if (params.get(name) === '1') {
            return;
          }
          params.set(name, '1');
        } else {
          if (!params.has(name)) {
            return;
          }
          params.delete(name);
        }
        history.replaceState(null, '', url);
      };
      onSet(apply);
    },
  ],
});
