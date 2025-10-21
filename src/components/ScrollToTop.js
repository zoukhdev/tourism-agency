/**
 * ScrollToTop Component - Automatically scrolls to top on route changes
 * 
 * This component ensures that when users navigate between pages,
 * the page always starts from the top instead of maintaining the
 * previous scroll position.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
