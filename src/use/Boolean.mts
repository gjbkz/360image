import { useCallback, useState } from 'react';

export const useBoolean = (defaultValue = false, key?: string) => {
  const [value, setValue] = useState(getInitialState(defaultValue, key));
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, setValue, setTrue, setFalse, toggle };
};

const getInitialState = (defaultValue = false, key?: string) => {
  if (key) {
    const params = new URLSearchParams(location.search);
    const value = params.get(key);
    if (value === '1') {
      return true;
    }
    if (value === '0') {
      return false;
    }
  }
  return defaultValue;
};
