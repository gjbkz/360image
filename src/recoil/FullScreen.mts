import { atom } from 'recoil';
import { isFunction } from '@nlib/typing';
import type { AtomEffect } from 'recoil';
import { getAppContainer } from '../util/getAppContainer.mjs';

const effects: Array<AtomEffect<boolean>> = [];
// eslint-disable-next-line @typescript-eslint/unbound-method
const available = isFunction(document.documentElement.requestFullscreen);

if (available) {
  effects.push(({ onSet, setSelf }) => {
    onSet((value) => {
      if (value && !document.fullscreenElement) {
        getAppContainer().requestFullscreen().catch(alert);
      } else if (document.fullscreenElement) {
        document.exitFullscreen().catch(alert);
      }
    });
    const abc = new AbortController();
    document.addEventListener(
      'fullscreenchange',
      () => setSelf(Boolean(document.fullscreenElement)),
      { signal: abc.signal },
    );
    return () => abc.abort();
  });
}

export const rcFullScreen = Object.assign(
  atom<boolean>({
    key: 'FullScreen',
    default: false,
    effects,
  }),
  { available },
);
