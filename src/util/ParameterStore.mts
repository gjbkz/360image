import { noop } from './noop.mjs';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const mockStorage: StorageLike = {
  getItem: () => null,
  setItem: noop,
  removeItem: noop,
};

export const createBooleanParameterStore = (
  name: string,
  defaultValue: boolean,
  storage = mockStorage,
) => {
  const TRUE = '1';
  const FALSE = '0';
  const set = (value: boolean) => {
    const url = new URL(location.href);
    const params = url.searchParams;
    if (value === defaultValue) {
      storage.removeItem(name);
      if (!params.has(name)) {
        return;
      }
      params.delete(name);
    } else {
      const v = value ? TRUE : FALSE;
      storage.setItem(name, v);
      if (params.get(name) === v) {
        return;
      }
      params.set(name, v);
    }
    history.replaceState(null, '', url);
  };
  const get = () => {
    const url = new URL(location.href);
    const params = url.searchParams;
    let value = defaultValue;
    if (params.has(name)) {
      value = params.get(name) === TRUE;
    } else {
      const stored = storage.getItem(name);
      if (stored) {
        value = stored === TRUE;
      }
    }
    set(value);
    return value;
  };
  return { get, set };
};
