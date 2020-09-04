import React from 'react';

export const loadingWrapper = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  return <T, X>(promise: (props?: X) => Promise<T>, props?: X): (() => void) => {
    return () => {
      setLoading(true);
      return promise(props).finally(() => {
        setLoading(false);
      });
    };
  };
};
