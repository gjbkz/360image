import { ImageTree } from './ImageTree.mjs';
import { buildViewerPage } from './buildViewerPage.mjs';
import { imagesDir, indexHtmlPath, srcDir } from './files.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { listFiles } from './listFiles.mjs';
import { pipeFile } from './pipeFile.mjs';
import { sanitize } from './sanitize.mjs';
import { siteTitle } from './site.mjs';
import { watchFiles } from './watchFiles.mjs';
import { writeFile } from './writeFile.mjs';

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
  if (await writeFile(indexHtmlPath, generateIndexHtml(imageTree))) {
    console.info(`buildIndexPage:done (${getElapsedMs(startedAt)})`);
  }
};

const generateIndexHtml = async function* (imageTree: ImageTree) {
  yield* generateHtmlPreamble({ title: '画像一覧' });
  yield `<header><h1>${sanitize(siteTitle)}</h1></header>\n`;
  yield* pipeFile(new URL('icons.html', srcDir));
  yield '<main>\n';
  yield '<h1>画像一覧</h1>\n';
  for (const [node, leaves] of imageTree.groupLeaves()) {
    yield `<h2>${sanitize(node ? node.title : 'その他')}</h2>\n`;
    yield '<ul>\n';
    for (const leaf of leaves) {
      yield '<li>';
      yield `<a href="${leaf.htmlPath}">${sanitize(leaf.config.title)}</a>`;
      const hotSpots = [...leaf.listHotSpots()];
      if (0 < hotSpots.length) {
        yield '<ol class="markers-list">';
        for (const hotSpot of hotSpots) {
          const href = `${leaf.htmlPath}#${encodeURIComponent(hotSpot.id)}`;
          yield `<li><a target="_blank" href="${href}">`;
          yield '<svg viewBox="-1 -1 14 14" class="icon"><use href="#external-link"/></svg>';
          yield `${sanitize(hotSpot.text)}</a></li>`;
        }
        yield '</ol>';
      }
      yield '</li>\n';
    }
    yield '</ul>\n';
  }
  yield* pipeFile(new URL('usage.html', srcDir));
  yield '</main>\n';
};
