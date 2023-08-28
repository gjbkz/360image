type ClassNameEntry = Array<ClassNameEntry> | string | false | null | undefined;

export const classnames = (...args: Array<ClassNameEntry>) => {
  const results: Array<string> = [];
  for (const item of list(args)) {
    const foundIndex = results.indexOf(item);
    if (0 <= foundIndex) {
      results.splice(foundIndex, 1);
    }
    results.push(item);
  }
  return results.join(' ');
};

const list = function* (entries: Array<ClassNameEntry>): Generator<string> {
  for (const entry of entries) {
    if (Array.isArray(entry)) {
      yield* list(entry);
    } else if (typeof entry === 'string') {
      for (const className of entry.split(/\s+/)) {
        if (className) {
          yield className;
        }
      }
    }
  }
};
