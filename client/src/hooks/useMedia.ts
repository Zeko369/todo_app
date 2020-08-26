import { useMemo, useState, useEffect } from 'react';

const getMatches = (mediaQueryList: any) => mediaQueryList.matches;

const useMediaQuery = (query: string) => {
  const mediaQueryList = useMemo(() => window && window.matchMedia(query), [query]);

  const [matches, setMatches] = useState(getMatches(mediaQueryList));

  useEffect(() => {
    const listener = (event: Event) => {
      setMatches(getMatches(event));
    };

    // mediaQueryList.addEventListener('change', listener);
    mediaQueryList.addListener(listener);

    return () => {
      // mediaQueryList.removeEventListener('change', listener);
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList]);

  return matches;
};

export default useMediaQuery;
