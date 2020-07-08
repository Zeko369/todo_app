import { useState, useCallback } from 'react';

const useToggle = (
  initValue = false
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(initValue);

  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle, setValue];
};

export default useToggle;
