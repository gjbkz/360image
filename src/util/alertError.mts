export const alertError = <Args extends Array<unknown>>(
  fn: (...args: Args) => Promise<unknown>,
) => {
  return (...args: Args) => {
    (async () => await fn(...args))().catch(alert);
  };
};
