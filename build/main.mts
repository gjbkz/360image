import { mkdir } from 'node:fs/promises';
import { docsDir } from './util/files.mjs';
import { buildCss } from './util/buildCss.mjs';
import { buildPages } from './util/buildPages.mjs';
import { buildViewerScript } from './util/buildViewerScript.mjs';

await mkdir(docsDir, { recursive: true });

const abc = new AbortController();
process.once('beforeExit', () => abc.abort());
const options = { watch: process.argv.includes('--watch'), signal: abc.signal };
await Promise.all([
  buildViewerScript(options),
  buildCss(options),
  buildPages(options),
]);
