import * as fs from 'node:fs';

export const pipeFile = async function* (file: URL): AsyncGenerator<string> {
  for await (const chunk of fs.createReadStream(file)) {
    yield `${chunk}`;
  }
};
