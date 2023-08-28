/** loader.mjsがbundleするのでimport.meta.urlはmain.mtsになります */
export const rootDir = new URL('../', import.meta.url);
export const srcDir = new URL('src/', rootDir);
export const docsDir = new URL('docs/', rootDir);
export const imagesDir = new URL('images/', rootDir);
export const cacheDir = new URL('.cache/', rootDir);
export const indexHtmlPath = new URL('index.html', docsDir);
export const testHtmlPath = new URL('test.html', docsDir);
