import * as fs from 'node:fs';
import type { FilledImageState } from './ImageState.mjs';
import { docsDir } from './files.mjs';
import { generateViewerHtml } from './generateViewerHtml.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';

export const buildViewerPage = async (image: FilledImageState) => {
  const startedPageAt = process.hrtime.bigint();
  const dest = new URL(image.htmlPath, docsDir);
  fs.mkdirSync(new URL('.', dest), { recursive: true });
  const writer = fs.createWriteStream(dest);
  for await (const line of generateViewerHtml(image)) {
    writer.write(line);
  }
  writer.end();
  console.info(
    `buildViewerPage:${image.htmlPath}:done (${getElapsedMs(startedPageAt)})`,
  );
};
