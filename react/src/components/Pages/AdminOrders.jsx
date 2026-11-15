import { useEffect, useState } from 'react';
import { getAllOrders, updateOrder, getBestSellers } from '../../api/ordersApi';
import AdminTabs from '../layout/AdminTabs';

const statusInfo = {
  pending: { label: 'ממתינה', color: '#f59e0b', background: '#fef3c7' },
  completed: { label: 'הושלמה', color: '#059669', background: '#d1fae5' },
  cancelled: { label: 'בוטלה', color: '#dc2626', background: '#fee2e2' },
};

// דף ניהול הזמנות - מנהל בלבד. מציג את כל ההזמנות ומאפשר לשנות סטטוס
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    getBestSellers(3).then(setTopProducts).catch(() => setTopProducts([]));
  }, []);

  const handleStatusChange = async (order, status) => {
    if (status === 'cancelled' && !window.confirm('לבטל את ההזמנה? המוצרים יחזרו למלאי.')) return;
    try {
      const updated = await updateOrder(order._id, { status });
      // שומרים את פרטי הלקוח שכבר הוצגו (התשובה מהשרת לא כוללת אותם)
      setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...updated, userId: o.userId } : o)));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div style={styles.page}><AdminTabs /><p style={styles.message}>טוען הזמנות...</p></div>;
  if (error) return <div style={styles.page}><AdminTabs /><p style={styles.message}>שגיאה: {error}</p></div>;

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div style={styles.page}>
      <AdminTabs />
      <h1 style={styles.title}>ניהול הזמנות 📦</h1>

      <div style={styles.summary}>
        <div style={styles.summaryBox}>
          <div style={styles.summaryNumber}>{orders.length}</div>
          <div>הזמנות</div>
        </div>
        <div style={styles.summaryBox}>
          <div style={styles.summaryNumber}>{orders.filter((o) => o.status === 'pending').length}</div>
          <div>ממתינות לטיפול</div>
        </div>
        <div style={styles.summaryBox}>
          <div style={styles.summaryNumber}>{revenue.toFixed(2)} ₪</div>
          <div>סה"כ הכנסות</div>
        </div>
      </div>

      {topProducts.length > 0 && (
        <div style={styles.topBox}>
          <span style={styles.topTitle}>🏆 הנמכרים ביותר:</span>
          {topProducts.map((p, index) => (
            <span key={p._id} style={styles.topItem}>
              {index + 1}. {p.name} <span style={styles.topCount}>({p.soldCount} יח')</span>
            </span>
          ))}
        </div>
      )}

      <div style={styles.filters}>
        {[['all', 'הכל'], ...Object.entries(statusInfo).map(([key, s]) => [key, s.label])].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{ ...styles.filterButton, ...(filter === key ? styles.filterActive : {}) }}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p style={styles.message}>אין הזמנות להצגה</p>
      ) : (
        filteredOrders.map((order) => {
          const status = statusInfo[order.status] || statusInfo.pending;
          return (
            <div key={order._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.orderNumber}>הזמנה #{order._id.slice(-6).toUpperCase()}</div>
                  <div style={styles.customer}>
                    {order.userId?.userName || 'משתמש לא ידוע'} · {order.userId?.email}
                  </div>
                  <div style={styles.date}>
                    {new Date(order.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  disabled={order.status === 'cancelled'}
                  style={{ ...styles.statusSelect, color: status.color, backgroundColor: status.background }}
                >
                  {Object.entries(statusInfo).map(([key, s]) => (
                    <option key={key} value={key}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.products}>
                {order.products.map((item, index) => (
                  <span key={item._id || index} style={styles.productChip}>
                    {item.productId?.name || 'מוצר שהוסר'} x {item.quantity}
                  </span>
                ))}
              </div>

              <div style={styles.total}>סה"כ: {order.totalPrice.toFixed(2)} ₪</div>
            </div>
          );
        })
      )}
    </div>
  );
}

const styles = {
  topBox: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 16px', background: '#fffbeb', border: '2px solid #fde68a', borderRadius: '16px', padding: '12px 18px', marginBottom: '20px' },
  topTitle: { fontWeight: 'bold', color: '#b45309' },
  topItem: { color: '#374151', fontWeight: 'bold' },
  topCount: { color: '#9ca3af', fontWeight: 'normal', fontSize: '14px' },
  page: { padding: '10px 20px 30px', direction: 'rtl', width: '100%', maxWidth: '900px', boxSizing: 'border-box', minHeight: '70vh' },
  title: { color: '#7c3aed', textAlign: 'center', fontSize: '32px', margin: '10px 0 25px' },
  message: { padding: '30px', textAlign: 'center', direction: 'rtl', fontSize: '18px', color: '#6b7280' },
  summary: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px', marginBottom: '25px' },
  summaryBox: { background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 100%)', borderRadius: '16px', padding: '18px', textAlign: 'center', color: '#6b7280' },
  summaryNumber: { fontSize: '26px', fontWeight: '900', color: '#7c3aed' },
  filters: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' },
  filterButton: { background: 'white', border: '2px solid #f3e8ff', borderRadius: '20px', padding: '8px 18px', cursor: 'pointer', fontWeight: 'bold', color: '#6b7280' },
  filterActive: { background: '#ec4899', borderColor: '#ec4899', color: 'white' },
  card: { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '15px', boxShadow: '0 6px 18px rgba(236, 72, 153, 0.12)', border: '2px solid #fce7f3' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' },
  orderNumber: { fontWeight: 'bold', fontSize: '18px', color: '#4b5563' },
  customer: { fontSize: '15px', color: '#7c3aed' },
  date: { fontSize: '13px', color: '#9ca3af' },
  statusSelect: { padding: '6px 12px', borderRadius: '20px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' },
  products: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  productChip: { background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '4px 10px', fontSize: '14px' },
  total: { marginTop: '12px', fontSize: '18px', fontWeight: 'bold', color: '#ec4899', textAlign: 'left' },
};
