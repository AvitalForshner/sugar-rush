import React from 'react';

const LOW_STOCK = 5;

const ProductCard = ({ name, price, imageURL, badge, onAddToCart, isAdmin, onEdit, onDelete, stock }) => {
  const isLowStock = stock !== undefined && stock < LOW_STOCK;
  return (
    <div style={styles.card}>
      {badge && <span style={styles.badge}>{badge}</span>}
      {isAdmin && (
        <div style={styles.adminActions}>
          <button style={styles.adminButton} onClick={onEdit} title="עריכת מוצר">✏️</button>
          <button style={styles.adminButton} onClick={onDelete} title="מחיקת מוצר">🗑️</button>
        </div>
      )}
      <div style={styles.imageContainer}>
        <img src={imageURL} alt={name} style={styles.image} />
      </div>
      <h3 style={styles.productName}>{name}</h3>
      {/* למנהל: כמה יחידות נשארו במלאי, באדום כשהמלאי נמוך */}
      {isAdmin && stock !== undefined && (
        <div style={{ ...styles.stock, ...(isLowStock ? styles.lowStock : {}) }}>
          {isLowStock ? '⚠️ ' : '📦 '}{stock} במלאי
        </div>
      )}
      <div style={styles.footerRow}>
        <span style={styles.price}>₪ {price}</span>
        <button 
          style={styles.addButton}
          onClick={onAddToCart} 
        >
          ➕
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '15px',
    width: '200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '2px solid #f3e5f5',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff4081',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  adminActions: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    display: 'flex',
    gap: '4px',
  },
  adminButton: {
    background: '#f3e8ff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    padding: 0,
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stock: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#059669',
    backgroundColor: '#d1fae5',
    borderRadius: '10px',
    padding: '2px 8px',
    marginBottom: '8px',
    alignSelf: 'flex-start',
  },
  lowStock: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
  },
  imageContainer: {
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  productName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
    textAlign: 'right',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    direction: 'rtl',
    marginTop: 'auto',
    width: '100%', 
  },
  price: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#7b1fa2',
  },
  addButton: {
      backgroundColor: '#ff4081',
      color: '#fff',
      border: 'none',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px', 
      display: 'flex',           
      alignItems: 'center',     
      justifyContent: 'center', 
      padding: 0,                
      transition: 'background-color 0.2s ease',
  },
};

export default ProductCard;