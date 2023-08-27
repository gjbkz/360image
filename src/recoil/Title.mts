import { atom } from 'recoil';
import { initialViewerConfig } from '../util/setup.mjs';
import { siteTitle } from '../util/site.mjs';

export const rcTitle = atom<string>({
  key: 'Title',
  default: initialViewerConfig.title,
  effects: [
    ({ onSet }) => {
      onSet((title) => {
        document.title = `${title} | ${siteTitle}`;
      });
    },
  ],
});
