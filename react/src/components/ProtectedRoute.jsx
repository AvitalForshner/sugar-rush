import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// עוטף דף שדורש התחברות. adminOnly - רק למנהל.
// משתמש לא מחובר מועבר לדף ההתחברות, ואחרי ההתחברות חוזר לדף שביקש.
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}
