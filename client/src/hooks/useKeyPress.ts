import { useEffect, useCallback } from 'react';

const useKeyPress = (
  targetKey: string,
  callback: (down: boolean, event?: KeyboardEvent) => any
) => {
  const downHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key, target } = event;
      if (key === targetKey && (target as any).type === undefined) {
        callback(true, event);
      }
    },
    [targetKey]
  );

  const upHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key, target } = event;
      if (key === targetKey && (target as any).type === undefined) {
        callback(false, event);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);
};

export default useKeyPress;
