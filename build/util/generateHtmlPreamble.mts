import { sanitize } from './sanitize.mjs';

export const siteTitle = '360度パノラマ画像ライブラリ';

interface PageProps {
  title: string;
  rootPath: string;
}

export const generateHtmlPreamble = function* ({ title, rootPath }: PageProps) {
  yield '<!doctype html>\n';
  yield '<meta charset="utf-8"/>\n';
  yield '<meta name="viewport" content="width=device-width,initial-scale=1"/>\n';
  yield `<title>${sanitize(`${title} | ${siteTitle}`)}</title>\n`;
  yield `<meta name="theme-color" content="#2d3748"/>\n`;
  yield `<link rel="stylesheet" href="${rootPath}app.css"/>\n`;
};
