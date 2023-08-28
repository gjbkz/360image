import fs from 'node:fs/promises';
import type { FilledImageState } from './ImageState.mjs';
import { docsDir, imagesDir, srcDir } from './files.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { pipeFile } from './pipeFile.mjs';
import { writeFile } from './writeFile.mjs';
import { generateSvgIcons } from './generateSvgIcons.mjs';

export const buildViewerPage = async (image: FilledImageState) => {
  const startedPageAt = process.hrtime.bigint();
  const dest = new URL(image.htmlPath, docsDir);
  if (await writeFile(dest, generateViewerHtml(image))) {
    console.info(
      `buildViewerPage:${image.htmlPath}:done (${getElapsedMs(startedPageAt)})`,
    );
  }
  await fs.copyFile(
    new URL(image.imagePath, imagesDir),
    new URL(image.imagePath, docsDir),
  );
};

const generateViewerHtml = async function* ({
  config,
  rootPath,
}: FilledImageState) {
  yield* generateHtmlPreamble({ title: config.title, rootPath });
  yield '<script id="viewer-config" type="application/json">\n';
  yield JSON.stringify(config, null, 2);
  yield '\n</script>\n';
  yield* pipeFile(new URL('viewer.html', srcDir));
  yield `<script src="${rootPath}viewer.js"></script>`;
  yield* generateSvgIcons();
};
