import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTabs from '../layout/AdminTabs';
import { getAllUsers, updateUser } from '../../api/usersApi';

// דף ניהול משתמשים - מנהל בלבד. שינוי תפקיד (לקוח/מנהל) וחסימה/שחרור של משתמשים
export default function AdminUsers() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (user, fields, confirmText) => {
    if (confirmText && !window.confirm(confirmText)) return;
    try {
      const updated = await updateUser(user._id, fields);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? updated : u)));
    } catch (err) {
      alert(err.message);
    }
  };

  const query = search.trim().toLowerCase();
  const filteredUsers = users.filter((u) =>
    query === '' || u.userName.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
  );

  return (
    <div style={styles.page}>
      <AdminTabs />
      <h1 style={styles.title}>ניהול משתמשים 👥</h1>

      {loading && <p style={styles.message}>טוען משתמשים...</p>}
      {error && <p style={styles.message}>שגיאה: {error}</p>}

      {!loading && !error && (
        <>
          <input
            placeholder="חיפוש לפי שם או אימייל..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
          <p style={styles.count}>
            {users.length} משתמשים · {users.filter((u) => u.role === 'admin').length} מנהלים · {users.filter((u) => u.status !== 'active').length} חסומים
          </p>

          {filteredUsers.map((u) => {
            const isSelf = u._id === currentUser?._id;
            const isBlocked = u.status !== 'active';
            return (
              <div key={u._id} style={{ ...styles.card, opacity: isBlocked ? 0.6 : 1 }}>
                <div style={styles.avatar}>{u.userName?.[0] || '?'}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={styles.name}>
                    {u.userName} {isSelf && <span style={styles.selfTag}>החשבון שלי</span>}
                  </div>
                  <div style={styles.email}>{u.email}</div>
                </div>

                <span style={{ ...styles.badge, ...(u.role === 'admin' ? styles.adminBadge : {}) }}>
                  {u.role === 'admin' ? 'מנהל' : 'לקוח'}
                </span>
                {isBlocked && <span style={{ ...styles.badge, ...styles.blockedBadge }}>חסום</span>}

                {!isSelf && (
                  <div style={styles.actions}>
                    <button
                      style={styles.button}
                      onClick={() => handleUpdate(
                        u,
                        { role: u.role === 'admin' ? 'customer' : 'admin' },
                        u.role === 'admin' ? `להסיר הרשאות מנהל מ-${u.userName}?` : `להפוך את ${u.userName} למנהל?`
                      )}
                    >
                      {u.role === 'admin' ? 'הפוך ללקוח' : 'הפוך למנהל'}
                    </button>
                    <button
                      style={{ ...styles.button, ...(isBlocked ? {} : styles.dangerButton) }}
                      onClick={() => handleUpdate(
                        u,
                        { status: isBlocked ? 'active' : 'inActive' },
                        isBlocked ? null : `לחסום את ${u.userName}? המשתמש לא יוכל להתחבר.`
                      )}
                    >
                      {isBlocked ? 'שחרר חסימה' : 'חסום'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

const styles = {
  page: { padding: '10px 20px 30px', direction: 'rtl', width: '100%', maxWidth: '900px', boxSizing: 'border-box', minHeight: '70vh' },
  title: { color: '#7c3aed', textAlign: 'center', fontSize: '32px', margin: '10px 0 20px' },
  message: { padding: '30px', textAlign: 'center', fontSize: '18px', color: '#6b7280' },
  search: { width: '100%', padding: '12px 18px', borderRadius: '25px', border: '2px solid #f3e8ff', fontSize: '15px', boxSizing: 'border-box', outline: 'none' },
  count: { color: '#6b7280', fontSize: '14px', margin: '10px 5px 15px' },
  card: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', background: 'white', borderRadius: '16px', padding: '14px 18px', marginBottom: '10px', boxShadow: '0 4px 12px rgba(236, 72, 153, 0.1)', border: '2px solid #fce7f3' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #9333ea)', color: 'white', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  name: { fontWeight: 'bold', color: '#374151' },
  email: { fontSize: '14px', color: '#9ca3af' },
  selfTag: { fontSize: '12px', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '10px', marginRight: '6px' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', background: '#f3f4f6', color: '#6b7280' },
  adminBadge: { background: '#ede9fe', color: '#6d28d9' },
  blockedBadge: { background: '#fee2e2', color: '#dc2626' },
  actions: { display: 'flex', gap: '8px' },
  button: { padding: '6px 14px', borderRadius: '20px', border: '2px solid #f3e8ff', background: 'white', color: '#6d28d9', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' },
  dangerButton: { borderColor: '#fecaca', color: '#dc2626' },
};
