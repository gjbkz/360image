import * as fs from 'node:fs/promises';
import { availableIcons } from '../../src/util/icons.mjs';
import { rootDir } from './files.mjs';

export const generateSvgIcons = async function* () {
  yield '<svg style="display:none">\n';
  yield '<defs>\n';
  for (const name of availableIcons) {
    switch (name) {
      case 'google':
        yield '<symbol id="icon-google" viewBox="0 0 24 24"><path d="M21.39 12.23c0 5.44-3.73 9.32-9.23 9.32A9.54 9.54 0 0 1 2.6 12a9.54 9.54 0 0 1 15.94-7.05l-2.6 2.5c-3.39-3.28-9.7-.81-9.7 4.55a5.98 5.98 0 0 0 5.9 6.03c3.79 0 5.2-2.71 5.42-4.11h-5.42v-3.3h9.1c.09.5.14.97.14 1.6z"/></symbol>\n';
        break;
      default:
        yield* loadIcon(name);
    }
  }
  yield '</defs>\n';
  yield '</svg>\n';
};

const loadIcon = async function* (name: string) {
  const file = new URL(
    `node_modules/@material-design-icons/svg/round/${name}.svg`,
    rootDir,
  );
  let svg = await fs.readFile(file, 'utf8');
  svg = svg.replace(/\s*xmlns="http:\/\/www.w3.org\/2000\/svg"\s*/, ' ');
  svg = svg.replace(/<svg/, `<symbol id="icon-${name}"`);
  svg = svg.replace(/\s+(width|height|viewBox)="[^"]+"\s+/, ' ');
  svg = svg.replace(/<\/svg/, '</symbol');
  yield svg;
};
