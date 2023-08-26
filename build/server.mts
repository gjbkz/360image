import { fileURLToPath } from 'node:url';
import { startServer } from 'sable';
import { docsDir } from './util/files.mjs';
// import { throttleImageDownload } from './util/throttleImageDownload.mjs';

await startServer({
  documentRoot: [fileURLToPath(docsDir)],
  // middlewares: [throttleImageDownload],
});
