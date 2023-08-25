import * as fs from 'node:fs';

interface WatchProps {
  files: Array<URL>;
  onChange: () => Promise<void> | void;
  debounceMs?: number;
  signal?: AbortSignal;
}

export const watchFiles = async ({
  files,
  onChange,
  debounceMs = 20,
  signal,
}: WatchProps) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  const stopTimer = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
  };
  if (signal) {
    signal.addEventListener('abort', stopTimer);
  }
  const onEvent = (event: fs.promises.FileChangeInfo<string>) => {
    console.info(`watchFiles(${event.eventType}): ${event.filename}`, event);
    stopTimer();
    timerId = setTimeout(() => {
      Promise.resolve(onChange()).catch(console.error);
    }, debounceMs);
  };
  onEvent({ eventType: 'change', filename: '' });
  await Promise.all(
    files.map(async (file) => {
      const stats = await fs.promises.stat(file);
      const recursive = stats.isDirectory();
      const watcher = fs.promises.watch(file, { recursive, signal });
      console.info(`watching ${file}${recursive ? ' recursively' : ''}`);
      for await (const event of watcher) {
        onEvent(event);
      }
    }),
  );
};
