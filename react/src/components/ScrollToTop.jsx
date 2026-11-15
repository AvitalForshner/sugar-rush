import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// בכל מעבר דף - גוללים לראש העמוד (React Router לא עושה את זה לבד)
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
