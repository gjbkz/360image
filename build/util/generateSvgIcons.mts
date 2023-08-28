import * as fs from 'node:fs/promises';
import { availableIcons } from '../../src/util/icons.mjs';
import { rootDir } from './files.mjs';

export const generateSvgIcons = async function* () {
  yield '<svg style="display:none">\n';
  yield '<defs>\n';
  for (const name of availableIcons) {
    yield* loadIcon(name);
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
