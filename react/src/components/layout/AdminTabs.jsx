import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/admin/orders', label: '📦 הזמנות' },
  { to: '/admin/users', label: '👥 משתמשים' },
  { to: '/admin/deleted-products', label: '♻️ מוצרים שנמחקו' },
  { to: '/add-product', label: '➕ הוספת מוצר' },
];

// לשוניות ניווט בין דפי הניהול, מוצגות בראש כל דף מנהל
export default function AdminTabs() {
  return (
    <nav style={styles.bar}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          style={({ isActive }) => ({ ...styles.tab, ...(isActive ? styles.active : {}) })}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

const styles = {
  bar: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', direction: 'rtl', margin: '20px 0 10px' },
  tab: { padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', color: '#6d28d9', backgroundColor: '#f3e8ff' },
  active: { backgroundColor: '#6d28d9', color: '#ffffff' },
};
