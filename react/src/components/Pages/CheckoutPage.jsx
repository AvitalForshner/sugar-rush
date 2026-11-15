import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrder } from '../../slice/ordersSlice';

export default function CheckoutPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.orders);
  // ממלאים מראש את השם והאימייל של המשתמש המחובר
  const [formData, setFormData] = useState({ name: user?.userName || '', email: user?.email || '', card: '', expiry: '', cvv: '' });

  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleFinishPurchase = async () => {
    if (cartItems.length === 0) {
      alert("העגלה ריקה 🍭");
      return;
    }
    if (!formData.name || !formData.email || !formData.card || !formData.expiry || !formData.cvv) {
      alert("נא למלא את כל פרטי התשלום כדי להמשיך 🍭");
      return;
    }

    // לשרת נשלחים רק המוצרים והכמויות. המחיר מחושב בשרת לפי ה-DB.
    // פרטי האשראי לא נשלחים לשום מקום - זה תשלום לדוגמה בלבד.
    const orderData = {
      products: cartItems.map((item) => ({ productId: item._id, quantity: item.quantity || 1 })),
    };

    try {
      await dispatch(addNewOrder(orderData)).unwrap();
      setCartItems([]);
      navigate('/thank-you');
    } catch (err) {
      alert("ההזמנה נכשלה: " + err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>סיום הזמנה 🍭</h1>
      
      <div style={styles.card}>
        <h2 style={{ textAlign: 'right' }}>העגלה שלך:</h2>
        
        <ul style={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item._id} style={styles.cartItem}>
              <span>{item.name} x {item.quantity}</span>
              <span style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toFixed(2)} ₪</span>
            </li>
          ))}
        </ul>

        <div style={styles.totalSection}>
          <span>סה"כ לתשלום:</span>
          <span style={styles.totalPrice}>{total.toFixed(2)} ₪</span>
        </div>

        <div style={styles.formGroup}>
          <input type="text" placeholder="שם מלא" value={formData.name} style={styles.input} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="אימייל" value={formData.email} style={styles.input} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="text" placeholder="מספר כרטיס אשראי" style={styles.input} onChange={(e) => setFormData({...formData, card: e.target.value})} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="תוקף (MM/YY)" style={{...styles.input, flex: 1}} onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
            <input type="text" placeholder="CVV" style={{...styles.input, flex: 1}} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
          </div>
        </div>

        <button style={{ ...styles.payButton, opacity: loading ? 0.6 : 1 }} onClick={handleFinishPurchase} disabled={loading}>
          {loading ? "שולחת את ההזמנה..." : "סיום רכישה מאובטח 💳"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '50px 20px', background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 100%)', minHeight: '100vh', direction: 'rtl' },
  title: { color: '#7c3aed', textAlign: 'center', marginBottom: '30px' },
  card: { maxWidth: '500px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 25px rgba(236, 72, 153, 0.2)' },
  cartList: { listStyle: 'none', padding: 0, margin: '20px 0', borderBottom: '1px solid #eee' },
  cartItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
  totalSection: { display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', margin: '20px 0', color: '#4b5563' },
  totalPrice: { color: '#ec4899' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '15px', borderRadius: '12px', border: '2px solid #fce7f3', fontSize: '16px' },
  payButton: { marginTop: '30px', width: '100%', padding: '15px', backgroundColor: '#ec4899', color: 'white', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }
};