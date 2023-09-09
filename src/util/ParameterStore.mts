import { isFiniteNumber } from '@nlib/typing';
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

export const createFloatParameterStore = (
  name: string,
  defaultValue: number,
  storage = mockStorage,
) => {
  const set = (value: number) => {
    const url = new URL(location.href);
    const params = url.searchParams;
    if (value === defaultValue) {
      storage.removeItem(name);
      if (!params.has(name)) {
        return;
      }
      params.delete(name);
    } else {
      const v = `${value}`.slice(0, 10);
      storage.setItem(name, v);
      if (params.get(name) === v) {
        return;
      }
      params.set(name, v);
    }
    history.replaceState(null, '', url);
  };
  const get = (): number => {
    const url = new URL(location.href);
    const params = url.searchParams;
    let v: string | null = null;
    if (params.has(name)) {
      v = params.get(name);
    } else {
      v = storage.getItem(name);
    }
    let value = v ? parseFloat(v) : defaultValue;
    if (!isFiniteNumber(value)) {
      value = defaultValue;
    }
    console.info({ get: name, v, value });
    set(value);
    return value;
  };
  return { get, set };
};
