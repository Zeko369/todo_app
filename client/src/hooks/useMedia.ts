import { useMemo, useState, useEffect } from 'react';

const getMatches = (mediaQueryList: MediaQueryList | null) => mediaQueryList?.matches;

const useMediaQuery = (query: string) => {
  const mediaQueryList = useMemo(
    () => (typeof window === 'undefined' ? null : window.matchMedia(query)),
    [query]
  );

  const [matches, setMatches] = useState(getMatches(mediaQueryList));

  useEffect(() => {
    const listener = (event: any) => {
      setMatches(getMatches(event));
    };

    // mediaQueryList.addEventListener('change', listener);
    mediaQueryList?.addListener(listener);

    return () => {
      // mediaQueryList.removeEventListener('change', listener);
      mediaQueryList?.removeListener(listener);
    };
  }, [mediaQueryList]);

  return matches;
};

export default useMediaQuery;
