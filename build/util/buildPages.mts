import { availableIcons } from '../../src/util/icons.mjs';
import { siteTitle } from '../../src/util/site.mjs';
import { ImageState } from './ImageState.mjs';
import { ImageTree } from './ImageTree.mjs';
import { buildViewerPage } from './buildViewerPage.mjs';
import { imagesDir, indexHtmlPath, testHtmlPath } from './files.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';
import { generateSvgIcons } from './generateSvgIcons.mjs';
import { getElapsedMs } from './getElapsedMs.mjs';
import { listFiles } from './listFiles.mjs';
import { sanitize } from './sanitize.mjs';
import { watchFiles } from './watchFiles.mjs';
import { writeFile } from './writeFile.mjs';

interface Options {
  watch?: boolean;
  signal?: AbortSignal;
}

export const buildPages = async ({ watch, signal }: Options = {}) => {
  if (watch) {
    await watchFiles({
      files: [imagesDir],
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
  for await (const file of listFiles(imagesDir)) {
    await imageTree.add(file.pathname.slice(imagesDir.pathname.length));
  }
  if (await writeFile(indexHtmlPath, generateIndexHtml(imageTree))) {
    console.info(`buildIndexPage:done (${getElapsedMs(startedAt)})`);
  }
  await writeFile(testHtmlPath, generateTestHtml());
};

const generateIndexHtml = async function* (imageTree: ImageTree) {
  const viewerBuilds: Array<Promise<void>> = [];
  yield* generateHtmlPreamble({ title: '画像一覧', rootPath: './' });
  yield `<header><h1>${sanitize(siteTitle)}</h1></header>\n`;
  yield '<main>\n';
  const processed = new WeakSet<ImageState>();
  for (const [node, leaves] of imageTree.groupLeaves()) {
    yield '<section>\n';
    yield `<h2>${sanitize(node ? node.title : 'その他')}</h2>\n`;
    yield '<ul>\n';
    for (const leaf of leaves) {
      processed.add(leaf);
      viewerBuilds.push(buildViewerPage(leaf));
      yield '<li>';
      yield `<a href="${leaf.htmlPath}">${sanitize(leaf.config.title)}</a>`;
      const markers = [...leaf.listMarkers()];
      if (0 < markers.length) {
        yield '<ol class="markers-list">';
        for (const marker of markers) {
          const href = `${leaf.htmlPath}#${encodeURIComponent(marker.id)}`;
          yield `<li><a target="_blank" href="${href}">`;
          yield `${sanitize(marker.text)}</a></li>`;
        }
        yield '</ol>';
      }
      yield '</li>\n';
    }
    yield '</ul>\n';
    yield '</section>\n';
  }
  yield '</main>\n';
  yield* generateSvgIcons();
  await Promise.all(viewerBuilds);
  for (const image of imageTree.listImages()) {
    if (!processed.has(image)) {
      console.warn(`UnusedImage: ${image.imagePath}`);
    }
  }
};

const generateTestHtml = async function* () {
  yield* generateHtmlPreamble({ title: '表示テスト', rootPath: './' });
  yield `<header><h1>${sanitize(siteTitle)}</h1></header>\n`;
  yield '<main>\n';
  yield '<section>\n';
  yield '<h2>Icons</h2>\n';
  yield '<ul class="icons">\n';
  for (const name of availableIcons) {
    yield `<li><svg width="24" height="24" viewBox="0 0 24 24"><use href="#icon-${name}"/></svg><span>${name}</span></li>`;
  }
  yield '</ul>\n';
  yield '</section>\n';
  yield '</main>\n';
  yield* generateSvgIcons();
};
