import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);

    if (savedPosition) {
      window.scrollTo(0, Number(savedPosition));
    } else {
      window.scrollTo(0, 0);
    }

    const saveScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY);
    };

    window.addEventListener("scroll", saveScroll);

    return () => {
      saveScroll();

      window.removeEventListener("scroll", saveScroll);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
