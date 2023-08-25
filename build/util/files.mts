export const rootDir = new URL('../../', import.meta.url);
export const srcDir = new URL('src/', rootDir);
export const docsDir = new URL('docs/', rootDir);
export const cacheDir = new URL('.cache/', rootDir);
export const indexHtmlPath = new URL('index.html', docsDir);
export const imagesDir = new URL('images/', docsDir);
