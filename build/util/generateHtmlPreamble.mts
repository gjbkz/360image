import { sanitize } from './sanitize.mjs';

export const siteTitle = '360度パノラマ画像ライブラリ';
const themeColor = '#f1f5f9';

interface PageProps {
  title: string;
}

export const generateHtmlPreamble = function* ({
  title,
}: PageProps): Generator<string> {
  yield '<!doctype html>';
  yield '<meta charset="utf-8" />';
  yield '<meta name="viewport" content="width=device-width,initial-scale=1" />';
  yield `<title>${sanitize(`${title} | ${siteTitle}`)}</title>`;
  yield `<meta name="theme-color" content="${themeColor}" />`;
  yield '<link rel="stylesheet" href="/app.css" />';
};
