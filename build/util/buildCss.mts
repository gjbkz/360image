import * as fs from 'node:fs';
import { docsDir, rootDir, srcDir } from './files.mjs';
import { watchFiles } from './watchFiles.mjs';
import { compileCss } from './compileCss.mjs';

const files = [
  new URL('common.scss', srcDir),
  new URL('index.scss', srcDir),
  new URL('viewer.scss', srcDir),
];

const onChange = async () => {
  const writer = fs.createWriteStream(new URL('app.css', docsDir));
  for await (const chunk of fs.createReadStream(
    new URL('node_modules/pannellum/build/pannellum.css', rootDir),
  )) {
    writer.write(chunk);
  }
  for (const file of files) {
    writer.write(await compileCss(file));
  }
  writer.end();
};

interface Options {
  watch?: boolean;
  signal?: AbortSignal;
}

export const buildCss = async ({ watch, signal }: Options = {}) => {
  if (watch) {
    await watchFiles({ files, onChange, signal });
  } else {
    await onChange();
  }
};
