/* eslint-disable @typescript-eslint/unbound-method */
import { isFunction } from '@nlib/typing';
const element = document.documentElement;

export const fullscreenIsAvailable = isFunction(element.requestFullscreen);
