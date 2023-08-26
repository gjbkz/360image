import { useContext } from 'react';
import type { Context } from 'react';

export const useContextValue = <T,>(context: Context<T | null>): T => {
  const value = useContext(context);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value === null) {
    throw Object.assign(
      new Error(`${context.displayName || 'context'} is null`),
      { context },
    );
  }
  return value;
};
