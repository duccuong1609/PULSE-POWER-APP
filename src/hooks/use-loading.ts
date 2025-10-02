import { useEffect, useState } from "react";

/**
 * ANIMATION LOADING ASYNC DATA WITH MIN LOADING TIME
 */
export function useLoading(isLoading: boolean, minTime: number) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), minTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, minTime]);

  return showLoader;
}
