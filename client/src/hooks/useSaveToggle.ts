import { useEffect, useState } from 'react';
import useToggle, { useToggleReturn } from './useToggle';

const isServer = typeof window === 'undefined';

// TODO: Use cookies for this
const useSaveToggle = (key: string, initValue?: boolean): useToggleReturn<boolean> => {
  const local = isServer ? null : localStorage.getItem(key);
  const [value, toggle, setValue] = useToggle(local === null ? initValue : local === 'true');

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, String(value));
    }
  }, [value]);

  return [value, toggle, setValue];
};

export const useSaveCycle = (
  key: string,
  initValue: number,
  range: number
): useToggleReturn<number> => {
  const local = String(isServer ? initValue : localStorage.getItem(key) || initValue);
  const [value, setValue] = useState<number>(parseInt(local));

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, String(value));
    }
  }, [value]);

  const toggle = () => {
    setValue((val) => (val + 1 === range ? 0 : val + 1));
  };

  return [value, toggle, setValue];
};

export default useSaveToggle;
