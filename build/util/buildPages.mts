import * as fs from 'node:fs';
import { ImageTree } from './ImageTree.mjs';
import { buildViewerPage } from './buildViewerPage.mjs';
import { imagesDir, indexHtmlPath, srcDir } from './files.mjs';
import { generateIndexHtml } from './generateIndexHtml.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { listFiles } from './listFiles.mjs';
import { watchFiles } from './watchFiles.mjs';

const buildIndexPage = async () => {
  const startedAt = process.hrtime.bigint();
  const imageTree = new ImageTree();
  const viewerBuilds: Array<Promise<void>> = [];
  for await (const file of listFiles(imagesDir)) {
    const image = imageTree.add(file.pathname.slice(imagesDir.pathname.length));
    if (image) {
      viewerBuilds.push(buildViewerPage(image));
    }
  }
  await Promise.all(viewerBuilds);
  console.info(`buildIndexPage:generating (${getElapsedMs(startedAt)})`);
  const writer = fs.createWriteStream(indexHtmlPath);
  for await (const line of generateIndexHtml(imageTree)) {
    writer.write(line);
  }
  writer.end();
  console.info(`buildIndexPage:done (${getElapsedMs(startedAt)})`);
};

interface Options {
  watch?: boolean;
  signal?: AbortSignal;
}

export const buildPages = async ({ watch, signal }: Options = {}) => {
  if (watch) {
    await watchFiles({
      files: [imagesDir, new URL('usage.html', srcDir)],
      onChange: buildIndexPage,
      signal,
    });
  } else {
    await buildIndexPage();
  }
};
