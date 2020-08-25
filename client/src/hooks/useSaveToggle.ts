import { useEffect } from 'react';
import useToggle, { useToggleReturn } from './useToggle';

const isServer = typeof window === 'undefined';

// TODO: Use cookies for this
const useSaveToggle = (key: string, initValue?: boolean): useToggleReturn => {
  const local = isServer ? null : localStorage.getItem(key);
  const [value, toggle, setValue] = useToggle(local === null ? initValue : local === 'true');

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, String(value));
    }
  }, [value]);

  return [value, toggle, setValue];
};

export default useSaveToggle;
