import React from 'react';
import ProductCard from '../Products/ProductCard';

// רשת כרטיסי מוצרים עם כותרת. משמשת גם ל"הכי נמכרים" וגם ל"כל המוצרים" בדף הבית
const BestSellers = ({ products, addToCart, isAdmin, onEdit, onDelete, title = 'כל המוצרים 🍬' }) => {
  const displayProducts = products || [];

  return (
    <div style={{ width: '100%', textAlign: 'center', margin: '40px 0 20px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{title}</h2>
      
      {displayProducts.length === 0 ? (
        <p style={styles.message}>לא נמצאו מוצרים בקטגוריה זו.</p>
      ) : (
        <div style={styles.grid}>
          {displayProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              name={product.name} 
              price={product.price}
              imageURL={product.imageURL} 
              badge={product.unitInStock === 0 ? "אזל המלאי" : null}
              onAddToCart={() => addToCart(product)}
              stock={product.unitInStock}
              isAdmin={isAdmin}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    flexWrap: 'wrap',
  },
  message: {
    fontSize: '18px',
    color: '#666',
    margin: '40px 0',
    direction: 'rtl',
  }
};

export default BestSellers;