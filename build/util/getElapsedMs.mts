export const getElapsedMs = (startedAt: bigint): string => {
  const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
  return `${elapsedMs.toFixed(3)}ms`;
};
