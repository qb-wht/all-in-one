/* eslint-disable @typescript-eslint/no-explicit-any */

export type AbortableDebounceResult<T extends (...args: any[]) => any> = {
  fn: (...args: Parameters<T>) => void;
  abort: () => void;
  forceApply: () => ReturnType<T> | undefined;
  applyAndClearTimeout: (...args: Parameters<T>) => ReturnType<T>;
  isPending: () => boolean;
};

export const abortableDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  timeMS: number,
): AbortableDebounceResult<T> => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | undefined;

  const clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    fn: (...args: Parameters<T>) => {
      lastArgs = args;

      clear();

      timeoutId = setTimeout(() => {
        fn(...(lastArgs as Parameters<T>));
        timeoutId = null;
        lastArgs = undefined;
      }, timeMS);
    },

    abort: () => {
      clear();
      lastArgs = undefined;
    },

    forceApply: () => {
      if (!lastArgs) return undefined;
      const result = fn(...lastArgs);
      clear();
      lastArgs = undefined;
      return result;
    },

    applyAndClearTimeout: (...args: Parameters<T>) => {
      clear();
      return fn(...args);
    },

    isPending: () => !!timeoutId,
  };
};
