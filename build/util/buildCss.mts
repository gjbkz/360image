import * as fs from 'node:fs/promises';
import { docsDir, srcDir } from './files.mjs';
import { watchFiles } from './watchFiles.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { compileCss } from './compileCss.mjs';

interface Options {
  watch?: boolean;
  signal?: AbortSignal;
}

export const buildCss = async ({ watch, signal }: Options = {}) => {
  const appScss = new URL('app.scss', srcDir);
  const dest = new URL('app.css', docsDir);
  const build = async () => {
    const startedAt = process.hrtime.bigint();
    await fs.writeFile(dest, await compileCss(appScss));
    console.info(`buildCss:done (${getElapsedMs(startedAt)})`);
  };
  if (watch) {
    await watchFiles({
      files: [appScss],
      onChange: build,
      signal,
    });
  } else {
    await build();
  }
};
