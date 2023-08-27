import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import type { RecoilState } from 'recoil';

export const useRecoilBooleanState = (rcState: RecoilState<boolean>) => {
  const [state, setState] = useRecoilState(rcState);
  const toggle = useCallback(() => setState((value) => !value), [setState]);
  const setTrue = useCallback(() => setState(true), [setState]);
  const setFalse = useCallback(() => setState(false), [setState]);
  return { state, setTrue, setFalse, toggle };
};
