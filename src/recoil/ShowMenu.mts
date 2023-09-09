import { atom } from 'recoil';
import { createBooleanParameterStore } from '../util/ParameterStore.mjs';

const store = createBooleanParameterStore('menu', false, sessionStorage);
export const rcShowMenu = atom<boolean>({
  key: 'ShowMenu',
  default: store.get(),
  effects: [({ onSet }) => onSet(store.set)],
});
