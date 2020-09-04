import { useState, useCallback } from 'react';

export type useToggleReturn<T> = [T, () => void, React.Dispatch<React.SetStateAction<T>>];

const useToggle = (initValue = false): useToggleReturn<boolean> => {
  const [value, setValue] = useState<boolean>(initValue);

  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle, setValue];
};

export default useToggle;
