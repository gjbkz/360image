import type { FilledImageState } from './ImageState.mjs';
import { generateHtmlPreamble } from './generateHtmlPreamble.mjs';

export const generateViewerHtml = function* ({
  config,
}: FilledImageState): Generator<string> {
  yield* generateHtmlPreamble({ title: config.title });
  yield '<div id="panorama">';
  yield '<noscript><div class="pnlm-info-box">';
  yield '<p>パノラマ画像を表示するにはJavaScriptを有効にしてください。</p>';
  yield '<p>To view this panorama, please enable JavaScript.</p>';
  yield '</div></noscript>';
  yield '</div>';
  yield '<script id="viewer-config" type="application/json">';
  yield JSON.stringify(config);
  yield '</script>';
  yield '<script src="/viewer.js"></script>';
};
