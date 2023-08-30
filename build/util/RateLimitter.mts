export class RateLimitter {
  private readonly taskIntervalMs: number;
  private readonly queue: Array<() => void> = [];
  private stop: (() => void) | null = null;

  public constructor(taskPerSecond: number) {
    this.taskIntervalMs = 1000 / taskPerSecond;
  }

  public enqueue<T>(task: () => T | Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        Promise.resolve(task()).then(resolve).catch(reject);
      });
      this.run();
    });
  }

  private get running(): boolean {
    return this.stop !== null;
  }

  private run(): void {
    if (this.running) {
      return;
    }
    const task = this.queue.shift();
    if (task) {
      task();
      const timerId = setTimeout(() => {
        this.stop = null;
        this.run();
      }, this.taskIntervalMs);
      this.stop = () => clearTimeout(timerId);
    }
  }
}
