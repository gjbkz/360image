import { svg } from './dom.mjs';

export const availableIcons = [
  'home',
  'close',
  'add',
  'location_on',
  'arrow_back_ios',
  'arrow_drop_down',
  'menu',
  'edit',
  'delete',
  'download',
] as const;

export const createMarkerIcon = () =>
  svg('svg', { viewBox: '-5 -1 10 7' }, svg('path', { d: 'M-4 0L0 6L4 0Z' }));
