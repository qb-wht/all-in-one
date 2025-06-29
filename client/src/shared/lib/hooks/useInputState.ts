import {useCallback, useState} from 'react';

export const useInputState = <T extends string>(
  init: T,
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<T>(init);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }, []);

  return [value, onChange];
};
