import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ isOpen, toggleCart, cartItems, updateQuantity }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    toggleCart();        
    navigate('/checkout'); 
  };

  return (
    <>
      {isOpen && <div onClick={toggleCart} style={styles.overlay} />}

      <div style={{...styles.sidebar, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'}}>
        <button onClick={toggleCart} style={styles.closeBtn}>סגור ✕</button>
        <h2 style={{ color: '#9333ea', marginBottom: '20px' }}>הסל המתוק שלך 🍭</h2>
        
        {cartItems.length === 0 ? (
          <div style={{ color: '#6b7280' }}>הסל שלך ריק... בואי למלא אותו בממתקים!</div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cartItems.map((item) => (
                <li key={item._id} style={styles.cartItem}>
                  <img src={item.imageURL} alt={item.name} style={styles.img} />
                  <div style={{ flexGrow: 1, marginRight: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ color: '#ec4899' }}>{item.price} ₪</div>
                  </div>
                  
                  <div style={styles.quantityControls}>
                    <button onClick={() => updateQuantity(item._id, 1)} style={styles.btnQty}>+</button>
                    <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, -1)} style={styles.btnQty}>-</button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div style={styles.totalBox}>
              <h3>סה"כ לתשלום: {total.toFixed(2)} ₪</h3>
              <button onClick={handleCheckout} style={styles.checkoutBtn}>
                לתשלום 💳
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 999
  },
  sidebar: {
    position: 'fixed', top: 0, left: 0, width: '400px', maxWidth: '100%', height: '100%',
    boxSizing: 'border-box', // ה-padding נכלל בגובה, אחרת תחתית העגלה (כפתור התשלום) נחתכת
    background: 'linear-gradient(135deg, #fff5f7 0%, #ffffff 100%)',
    borderLeft: '4px solid #ec4899', boxShadow: '-10px 0 30px rgba(236, 72, 153, 0.2)',
    zIndex: 1000, padding: '30px', direction: 'rtl',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', overflowY: 'auto'
  },
  closeBtn: {
    background: '#ec4899', color: 'white', border: 'none', padding: '10px 20px',
    borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px'
  },
  cartItem: { 
    display: 'flex', alignItems: 'center', padding: '15px', 
    background: 'white', borderRadius: '12px', marginBottom: '10px' 
  },
  img: { width: '50px', height: '50px', objectFit: 'contain' },
  quantityControls: { 
    display: 'flex', alignItems: 'center', justifyContent: 'center', 
    gap: '10px', padding: '5px', background: '#fce4ec', borderRadius: '8px'
  },
  btnQty: {
    border: 'none', background: '#ec4899', color: 'white',
    width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '20px', fontWeight: 'bold'
  },
  totalBox: { marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '10px' },
  checkoutBtn: {
    marginTop: '15px', width: '100%', padding: '15px',
    backgroundColor: '#9333ea', color: 'white', border: 'none',
    borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
  }
};