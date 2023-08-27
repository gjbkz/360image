import * as fs from 'node:fs';
import * as stream from 'node:stream';
import type * as http from 'node:http';
import { docsDir } from './files.mjs';

class Throttle extends stream.Transform {
  private readonly kbps: number;

  public constructor(kbps: number) {
    super();
    this.kbps = kbps;
  }

  public _transform(
    chunk: Buffer,
    _encoding: unknown,
    callback: stream.TransformCallback,
  ) {
    const { kbps } = this;
    let pos = 0;
    let lastMs = Date.now();
    const timer = setInterval(() => {
      const nowMs = Date.now();
      const elapsedMs = nowMs - lastMs;
      lastMs = nowMs;
      const bytes = kbps * elapsedMs;
      const bytesToWrite = Math.min(bytes, chunk.length - pos);
      if (bytesToWrite > 0) {
        this.push(chunk.subarray(pos, pos + bytesToWrite));
        pos += bytesToWrite;
      }
      if (chunk.length <= pos) {
        clearInterval(timer);
        callback();
      }
    }, 50);
  }
}

export const throttleImageDownload = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: () => void,
) => {
  if (req.url?.match(/\.jpg$/)) {
    const fileUrl = new URL(req.url.replace(/^\/+/, ''), docsDir);
    try {
      const stat = fs.statSync(fileUrl);
      res.writeHead(200, {
        'content-type': 'image/jpeg',
        'content-length': stat.size,
      });
      fs.createReadStream(fileUrl).pipe(new Throttle(20)).pipe(res);
    } catch (error) {
      console.error(error);
      res.writeHead(404);
      res.end();
    }
  } else {
    next();
  }
};
