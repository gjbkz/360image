import * as assert from 'assert';
import { RateLimitter } from './RateLimitter.mjs';

const limitter = new RateLimitter(10);
const tasks: Array<Promise<unknown>> = [];
for (let i = 0; i < 5; i++) {
  const startedAt = Date.now();
  tasks.push(
    limitter
      .enqueue(() => Date.now())
      .then((finishedAt) => {
        const elapsedMs = finishedAt - startedAt;
        console.info(`#${i}: ${startedAt} → ${finishedAt} (${elapsedMs}ms)`);
        assert.ok(100 * i <= elapsedMs);
      }),
  );
}
await Promise.all(tasks);
console.info('passed:RateLimitter');
