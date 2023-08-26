import * as fs from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { cacheDir, rootDir } from './files.mjs';
import { ignoreENOENT } from './ignoreENOENT.mjs';

export const writeFile = async (
  dest: URL,
  stream: AsyncIterable<Buffer | string>,
) => {
  const cacheFile = getCacheFile(dest);
  const [hash, data] = await Promise.all([
    fs.readFile(cacheFile, 'utf8').catch(ignoreENOENT),
    readData(stream),
  ]);
  if (hash === data.hash) {
    return false;
  }
  await fs.mkdir(new URL('.', dest), { recursive: true });
  await fs.writeFile(dest, data.buffer);
  await fs.mkdir(new URL('.', cacheFile), { recursive: true });
  await fs.writeFile(cacheFile, data.hash);
  return true;
};

const getCacheFile = (dest: URL) => {
  const relativePath = dest.pathname.slice(rootDir.pathname.length);
  return new URL(`writeFile/${relativePath}`, cacheDir);
};

const readData = async (data: AsyncIterable<Buffer | string>) => {
  const chunks: Array<Buffer> = [];
  const hash = crypto.createHash('sha256');
  let totalLength = 0;
  for await (let chunk of data) {
    chunk = Buffer.from(chunk);
    chunks.push(chunk);
    totalLength += chunk.length;
    hash.update(chunk);
  }
  return {
    buffer: Buffer.concat(chunks, totalLength),
    hash: hash.digest('base64url'),
  };
};
