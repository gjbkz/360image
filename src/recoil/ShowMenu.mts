import { atom } from 'recoil';
import { searchParams } from '../util/searchParams.mjs';

export const rcShowMenu = atom<boolean>({
  key: 'ShowMenu',
  default:
    searchParams.boolean('menu', false) || searchParams.boolean('edit', false),
});
