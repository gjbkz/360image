import type { ImageTree } from './ImageTree.mjs';
import { srcDir } from './files.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';
import { pipeFile } from './pipeFile.mjs';
import { sanitize } from './sanitize.mjs';
import { siteTitle } from './site.mjs';

export const generateIndexHtml = async function* (
  imageTree: ImageTree,
): AsyncGenerator<string> {
  yield* generateHtmlPreamble({ title: '画像一覧' });
  yield `<header><h1>${sanitize(siteTitle)}</h1></header>`;
  yield* pipeFile(new URL('icons.html', srcDir));
  yield '<main>';
  yield '<h1>画像一覧</h1>';
  for (const [node, leaves] of imageTree.groupLeaves()) {
    yield `<h2>${sanitize(node ? node.title : 'その他')}</h2>`;
    yield '<ul>';
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
      yield '</li>';
    }
    yield '</ul>';
  }
  yield* pipeFile(new URL('usage.html', srcDir));
  yield '</main>';
};
