import { useEffect, useState } from 'react';
import AdminTabs from '../layout/AdminTabs';
import { getInactiveProducts, updateProduct } from '../../api/productsApi';

// מוצרים שנמחקו (מחיקה רכה) - מנהל יכול להחזיר אותם לחנות
export default function AdminDeletedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInactiveProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRestore = async (product) => {
    try {
      await updateProduct(product._id, { status: 'active' });
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <AdminTabs />
      <h1 style={styles.title}>מוצרים שנמחקו ♻️</h1>

      {loading && <p style={styles.message}>טוען...</p>}
      {error && <p style={styles.message}>שגיאה: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p style={styles.message}>אין מוצרים שנמחקו 🎉</p>
      )}

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img src={product.imageURL} alt={product.name} style={styles.image} />
            <div style={styles.name}>{product.name}</div>
            <div style={styles.details}>{product.price} ₪ · {product.unitInStock} במלאי</div>
            <button style={styles.button} onClick={() => handleRestore(product)}>החזר לחנות</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '10px 20px 30px', direction: 'rtl', width: '100%', maxWidth: '1000px', boxSizing: 'border-box', minHeight: '70vh' },
  title: { color: '#7c3aed', textAlign: 'center', fontSize: '32px', margin: '10px 0 20px' },
  message: { padding: '30px', textAlign: 'center', fontSize: '18px', color: '#6b7280' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' },
  card: { width: '180px', background: 'white', borderRadius: '16px', padding: '15px', border: '2px dashed #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' },
  image: { height: '100px', maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(60%)' },
  name: { fontWeight: 'bold', color: '#374151' },
  details: { fontSize: '13px', color: '#9ca3af' },
  button: { marginTop: '6px', padding: '8px 16px', borderRadius: '20px', border: 'none', background: '#10b981', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
};
