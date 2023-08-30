import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';
import { alertError } from '../util/alertError.mjs';
import { dom } from '../util/dom.mjs';
import { rcRenderContainer } from './Viewer.mjs';

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
    ({ onSet, getPromise }) => {
      const apply = alertError(async (value: boolean) => {
        const container = await getPromise(rcRenderContainer);
        container.dataset.edit = value ? '1' : '0';
      });
      onSet(apply);
      getPromise(rcEditMode).then(apply).catch(alert);
    },
    ({ onSet, getPromise }) => {
      const elements = new Set<HTMLElement>();
      const reset = () => {
        for (const element of elements) {
          element.remove();
        }
      };
      const apply = alertError(async (value: boolean) => {
        reset();
        if (!value) {
          return;
        }
        const container = await getPromise(rcRenderContainer);
        const v = dom('div', { class: 'pnlm-crosshair pnlm-crosshair-v' });
        elements.add(v);
        const h = dom('div', { class: 'pnlm-crosshair pnlm-crosshair-h' });
        elements.add(h);
        container.append(v, h);
      });
      onSet(apply);
      getPromise(rcEditMode).then(apply).catch(alert);
      return reset;
    },
  ],
});
