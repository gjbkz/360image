/* eslint-disable @typescript-eslint/unbound-method */
import { isFunction } from '@nlib/typing';

export const fullscreenIsAvailable = isFunction(
  document.documentElement.requestFullscreen,
);
