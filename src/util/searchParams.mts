const get = () => new URLSearchParams(location.search);

export const searchParams = {
  get,
  boolean: (key: string, fallback = false) => {
    const value = get().get(key);
    if (value === '1') {
      return true;
    }
    if (value === '0') {
      return false;
    }
    return fallback;
  },
};
