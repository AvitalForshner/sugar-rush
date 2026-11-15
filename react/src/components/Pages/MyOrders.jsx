import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrder } from '../../slice/ordersSlice';

const statusInfo = {
  pending: { label: 'ממתינה', color: '#f59e0b', background: '#fef3c7' },
  completed: { label: 'הושלמה', color: '#059669', background: '#d1fae5' },
  cancelled: { label: 'בוטלה', color: '#dc2626', background: '#fee2e2' },
};

export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleCancel = async (orderId) => {
    if (!window.confirm('לבטל את ההזמנה?')) return;
    try {
      await dispatch(updateOrder({ id: orderId, updateFields: { status: 'cancelled' } })).unwrap();
    } catch (err) {
      alert('לא ניתן לבטל את ההזמנה: ' + err);
    }
  };

  if (loading && orders.length === 0) return <p style={styles.message}>טוען הזמנות... 🍬</p>;
  if (error) return <p style={styles.message}>שגיאה: {error}</p>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ההזמנות שלי 📋</h1>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>עוד לא הזמנת כלום... 🍭</p>
          <button style={styles.shopButton} onClick={() => navigate('/')}>לחנות</button>
        </div>
      ) : (
        orders.map((order) => {
          const status = statusInfo[order.status] || statusInfo.pending;
          return (
            <div key={order._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.orderNumber}>הזמנה #{order._id.slice(-6).toUpperCase()}</div>
                  <div style={styles.date}>
                    {new Date(order.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span style={{ ...styles.status, color: status.color, backgroundColor: status.background }}>
                  {status.label}
                </span>
              </div>

              <ul style={styles.productList}>
                {order.products.map((item, index) => (
                  <li key={item._id || index} style={styles.productRow}>
                    {item.productId?.imageURL && (
                      <img src={item.productId.imageURL} alt={item.productId.name} style={styles.image} />
                    )}
                    <span style={{ flexGrow: 1 }}>{item.productId?.name || 'מוצר שהוסר'}</span>
                    <span style={styles.quantity}>x {item.quantity}</span>
                    <span style={styles.price}>{(item.price * item.quantity).toFixed(2)} ₪</span>
                  </li>
                ))}
              </ul>

              <div style={styles.cardFooter}>
                <span style={styles.total}>סה"כ: {order.totalPrice.toFixed(2)} ₪</span>
                {order.status === 'pending' && (
                  <button style={styles.cancelButton} onClick={() => handleCancel(order._id)} disabled={loading}>
                    ביטול הזמנה
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const styles = {
  page: { padding: '30px 20px', direction: 'rtl', width: '100%', maxWidth: '800px', boxSizing: 'border-box', minHeight: '70vh' },
  title: { color: '#7c3aed', textAlign: 'center', fontSize: '32px', marginBottom: '30px' },
  message: { padding: '40px', textAlign: 'center', direction: 'rtl', fontSize: '18px' },
  empty: { textAlign: 'center', fontSize: '18px', color: '#6b7280' },
  shopButton: { backgroundColor: '#ec4899', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
  card: { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0 6px 18px rgba(236, 72, 153, 0.12)', border: '2px solid #fce7f3' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  orderNumber: { fontWeight: 'bold', fontSize: '18px', color: '#4b5563' },
  date: { fontSize: '14px', color: '#9ca3af' },
  status: { padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' },
  productList: { listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #f3f4f6' },
  productRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  image: { width: '45px', height: '45px', objectFit: 'contain' },
  quantity: { color: '#6b7280' },
  price: { fontWeight: 'bold', minWidth: '80px', textAlign: 'left' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' },
  total: { fontSize: '20px', fontWeight: 'bold', color: '#ec4899' },
  cancelButton: { backgroundColor: 'white', color: '#dc2626', border: '2px solid #fecaca', padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
};
