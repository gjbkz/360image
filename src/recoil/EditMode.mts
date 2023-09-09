import { atom } from 'recoil';
import { alertError } from '../util/alertError.mjs';
import { dom } from '../util/dom.mjs';
import { createBooleanParameterStore } from '../util/ParameterStore.mjs';
import { rcRenderContainer } from './Viewer.mjs';

const store = createBooleanParameterStore('edit', false, sessionStorage);
export const rcEditMode = atom<boolean>({
  key: 'EditMode',
  default: store.get(),
  effects: [
    ({ onSet }) => onSet(store.set),
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
