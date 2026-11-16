import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// בכל ניווט - גוללים לראש העמוד (React Router לא עושה את זה לבד).
// משתמשים ב-location.key ולא ב-pathname, כדי שגם לחיצה על דף הבית כשכבר נמצאים בו תחזיר למעלה
export default function ScrollToTop() {
  const { key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return null;
}
