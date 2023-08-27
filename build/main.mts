import { buildPages } from './util/buildPages.mjs';
import { buildViewerScript } from './util/buildViewerScript.mjs';

const abc = new AbortController();
process.once('beforeExit', () => abc.abort());
const options = { watch: process.argv.includes('--watch'), signal: abc.signal };
await Promise.all([buildViewerScript(options), buildPages(options)]);
