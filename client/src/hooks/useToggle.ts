import { useState, useCallback } from 'react';

export type useToggleReturn = [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>];

const useToggle = (initValue = false): useToggleReturn => {
  const [value, setValue] = useState<boolean>(initValue);

  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle, setValue];
};

export default useToggle;
