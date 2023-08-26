import { sanitize } from './sanitize.mjs';

export const siteTitle = '360度パノラマ画像ライブラリ';
const themeColor = '#f1f5f9';

interface PageProps {
  title: string;
}

export const generateHtmlPreamble = function* ({ title }: PageProps) {
  yield '<!doctype html>\n';
  yield '<meta charset="utf-8"/>\n';
  yield '<meta name="viewport" content="width=device-width,initial-scale=1"/>\n';
  yield `<title>${sanitize(`${title} | ${siteTitle}`)}</title>\n`;
  yield `<meta name="theme-color" content="${themeColor}"/>\n`;
  yield '<link rel="stylesheet" href="/app.css"/>\n';
};
