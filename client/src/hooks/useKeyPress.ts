import { useEffect, useCallback } from 'react';

const useKeyPress = (targetKey: string, callback: (down: boolean) => any) => {
  const downHandler = useCallback(
    ({ key, target }: KeyboardEvent) => {
      if (key === targetKey && (target as any).type === undefined) {
        callback(true);
      }
    },
    [targetKey]
  );

  const upHandler = useCallback(
    ({ key, target }: KeyboardEvent) => {
      if (key === targetKey && (target as any).type === undefined) {
        callback(false);
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
