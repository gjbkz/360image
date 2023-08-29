import * as cp from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildDir, rootDir, srcDir } from './util/files.mjs';
import { listFiles } from './util/listFiles.mjs';

for (const dir of [srcDir, buildDir]) {
  for await (const file of listFiles(dir)) {
    if (file.pathname.endsWith('.test.mts')) {
      await new Promise<void>((resolve, reject) => {
        const command = [
          'node',
          '--experimental-loader',
          './loader.mjs',
          fileURLToPath(file),
        ].join(' ');
        console.info(`> ${command}`);
        const child = cp.spawn(command, {
          stdio: 'inherit',
          cwd: rootDir,
          shell: true,
        });
        child.on('exit', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Failed(${code}): ${fileURLToPath(file)}`));
          }
        });
      });
    }
  }
}
