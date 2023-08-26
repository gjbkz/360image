import type { FilledImageState } from './ImageState.mjs';
import { docsDir, srcDir } from './files.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { pipeFile } from './pipeFile.mjs';
import { writeFile } from './writeFile.mjs';

export const buildViewerPage = async (image: FilledImageState) => {
  const startedPageAt = process.hrtime.bigint();
  const dest = new URL(image.htmlPath, docsDir);
  if (await writeFile(dest, generateViewerHtml(image))) {
    console.info(
      `buildViewerPage:${image.htmlPath}:done (${getElapsedMs(startedPageAt)})`,
    );
  }
};

const generateViewerHtml = async function* ({ config }: FilledImageState) {
  yield* generateHtmlPreamble({ title: config.title });
  yield '<script id="viewer-config" type="application/json">';
  yield JSON.stringify(config, null, 2);
  yield '</script>\n';
  yield* pipeFile(new URL('viewer.html', srcDir));
};
