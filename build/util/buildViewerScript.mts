import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { rootDir, srcDir } from './files.mjs';
import { watchFiles } from './watchFiles.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';

interface Options {
  watch?: boolean;
  signal?: AbortSignal;
}

export const buildViewerScript = async ({ watch, signal }: Options = {}) => {
  const pnlmJs = new URL('node_modules/pannellum/build/pannellum.js', rootDir);
  const build = async () => {
    const startedAt = process.hrtime.bigint();
    await esbuild.build({
      absWorkingDir: fileURLToPath(rootDir),
      entryPoints: ['src/viewer.tsx'],
      resolveExtensions: ['.tsx', '.ts', '.js'],
      outfile: 'docs/viewer.js',
      bundle: true,
      minify: false,
      banner: { js: await fs.readFile(pnlmJs, 'utf8') },
    });
    console.info(`buildViewerScript:done (${getElapsedMs(startedAt)})`);
  };
  if (watch) {
    await watchFiles({
      files: [
        new URL('viewer.tsx', srcDir),
        new URL('components', srcDir),
        new URL('util', srcDir),
      ],
      onChange: build,
      signal,
    });
  } else {
    await build();
  }
};
