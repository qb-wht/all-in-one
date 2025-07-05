/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useMemo, useRef} from 'react';
import {abortableDebounce, type AbortableDebounceResult} from '../timer';

export const useAbortableDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): AbortableDebounceResult<T> => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debounce = useMemo(() => {
    return abortableDebounce((...args: Parameters<T>) => {
      return fnRef.current(...args);
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      debounce.abort();
    };
  }, [debounce]);

  return debounce;
};
