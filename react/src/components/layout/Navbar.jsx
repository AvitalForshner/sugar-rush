import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slice/AuthSlice';

export default function Navbar({ searchQuery, setSearchQuery, toggleCart, cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // התנתקות מלאה: מוחק טוקן ומשתמש (דרך ה-slice) וחוזר לדף הבית כגולש אנונימי
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // החיפוש מסנן מוצרים בדף הבית - אם מקלידים מדף אחר, עוברים לדף הבית כדי לראות תוצאות
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') navigate('/');
  };

  // חזרה לדף הבית עם איפוס החיפוש (הסינון מתאפס כי דף הבית נטען מחדש בכל כניסה)
  const goHome = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <nav style={styles.navBar}>
      <div style={styles.navContainer}>
        <div style={styles.logoWrapper}>
          <span style={{ ...styles.logoText, cursor: 'pointer' }} onClick={goHome}>SUGAR RUSH 🍭</span>
        </div>

        <div style={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="חפשו חמוצים, שוקולדים, חטיפים..." 
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.menuLinks}>
          
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/orders" style={styles.adminButton}>⚙️ ניהול</Link>
          )}

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>שלום, {user?.userName}</span>
              <div onClick={handleLogout} style={styles.logoutButton} title="התנתק">🚪</div>
            </div>
          ) : (
            <Link to="/login" style={styles.authButton}>🐻</Link>
          )}

          <div onClick={goHome} style={styles.homeButton} title="עמוד הבית">🏠</div>

          <div style={styles.cartButton } title="העגלה שלי" onClick={toggleCart}>
            🛒
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </div>

          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <div style={styles.homeButton} title="ההזמנות שלי">📋</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navBar: { direction: 'rtl', width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50, boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, sans-serif' },
  navContainer: { maxWidth: '1200px', margin: '0 auto', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box' },
  logoText: { fontSize: '24px', fontWeight: '900', background: 'linear-gradient(90deg, #ec4899 0%, #9333ea 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  searchWrapper: { flex: 1, margin: '0 20px', display: 'flex', justifyContent: 'center' },
  searchInput: { width: '100%', maxWidth: '400px', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', outline: 'none', fontSize: '15px', boxSizing: 'border-box' },
  menuLinks: { display: 'flex', alignItems: 'center', gap: '16px' },
  authButton: { cursor: 'pointer', backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '50px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none' },
  homeButton: { cursor: 'pointer', backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '50px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cartButton: { cursor: 'pointer', backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '50px', color: '#7c3aed', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cartBadge: { position: 'absolute', top: '-5px', left: '-5px', backgroundColor: '#ec4899', color: '#ffffff', fontSize: '11px', width: '18px', height: '18px', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', border: '2px solid #ffffff' },
  adminButton: { backgroundColor: '#6d28d9', color: '#ffffff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  logoutButton: {
    cursor: 'pointer',
    backgroundColor: '#f3e8ff',
    padding: '12px',
    borderRadius: '50px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },};