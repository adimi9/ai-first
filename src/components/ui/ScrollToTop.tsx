// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the modern standard for setting scroll position.
    // However, for maximum compatibility (especially with older browsers or certain CSS layouts),
    // you might also consider "window.scrollTo(0, 0);" or "document.body.scrollTo(0,0);"
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run the effect whenever the pathname changes

  return null; // This component doesn't render anything, it just handles a side effect
}

export default ScrollToTop;