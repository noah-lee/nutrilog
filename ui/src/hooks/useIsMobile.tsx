import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile())

  useEffect(() => {
    const onResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", onResize);
    // Call it once on mount in case window size changed since initial render
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
};

export const checkIsMobile = () => {
  const isSmallScreen = window.innerWidth < 768;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  if (nav.userAgentData) {
    return nav.userAgentData.mobile || isSmallScreen;
  }

  const ua = nav.userAgent || nav.vendor;
  const isMobileUA = /android|iphone|ipad|ipod|windows phone|blackberry/i.test(
    ua
  );

  return isMobileUA || isSmallScreen;
};
