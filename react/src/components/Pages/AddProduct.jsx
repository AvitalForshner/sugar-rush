import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProductById, updateProduct } from '../../api/productsApi';
import AdminTabs from '../layout/AdminTabs';

// מזהי הקטגוריות זהים לאלה שבעיגולי הקטגוריות בדף הבית
const categories = [
  { id: 1, name: 'ממתקים' },
  { id: 2, name: 'חטיפים' },
  { id: 3, name: 'שוקולדים' },
  { id: 4, name: 'sweetBOX' },
];

const emptyProduct = { name: '', price: '', description: '', imageURL: '', categoryId: 1, unitInStock: '' };

// טופס מוצר: בלי id בכתובת - הוספת מוצר חדש, עם id (/edit-product/:id) - עריכת מוצר קיים
export default function AddProduct() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) {
      setProduct(emptyProduct);
      return;
    }
    getProductById(id)
      .then((data) => setProduct({ ...emptyProduct, ...data, description: data.description || '' }))
      .catch((err) => {
        alert(err.message);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate]);

  const handleChange = (field) => (e) => setProduct({ ...product, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      price: Number(product.price),
      categoryId: Number(product.categoryId),
      unitInStock: Number(product.unitInStock),
    };
    try {
      if (isEdit) {
        await updateProduct(id, productData);
        alert('המוצר עודכן בהצלחה!');
      } else {
        await addProduct(productData);
        alert('המוצר נוסף בהצלחה!');
      }
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p style={{ padding: '40px', direction: 'rtl' }}>טוען מוצר...</p>;

  return (
    <div style={styles.pageWrapper}>
      {!isEdit && <AdminTabs />}
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>{isEdit ? 'עריכת מוצר ✏️' : 'הוספת מוצר חדש ל-Sugar Rush 🍭'}</h2>
        <label style={styles.label}>שם המוצר</label>
        <input style={styles.input} value={product.name} onChange={handleChange('name')} required />
        <label style={styles.label}>מחיר (₪)</label>
        <input type="number" step="0.1" min="0" style={styles.input} value={product.price} onChange={handleChange('price')} required />
        <label style={styles.label}>תיאור</label>
        <input style={styles.input} value={product.description} onChange={handleChange('description')} />
        <label style={styles.label}>קטגוריה</label>
        <select style={styles.input} value={product.categoryId} onChange={handleChange('categoryId')}>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <label style={styles.label}>כמות במלאי</label>
        <input type="number" min="0" style={styles.input} value={product.unitInStock} onChange={handleChange('unitInStock')} required />
        <label style={styles.label}>לינק לתמונה</label>
        <input placeholder="https://..." style={styles.input} value={product.imageURL} onChange={handleChange('imageURL')} required />
        {product.imageURL && <img src={product.imageURL} alt="תצוגה מקדימה" style={styles.preview} />}
        <button type="submit" style={styles.button}>{isEdit ? 'שמירת שינויים' : 'שמור מוצר במלאי'}</button>
      </form>
    </div>
  );
}

const styles = {
  pageWrapper: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%', backgroundColor: '#fdf2f8', direction: 'rtl', padding: '30px 0' },
  form: { backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' },
  title: { textAlign: 'center', color: '#6d28d9', marginBottom: '10px' },
  label: { fontSize: '14px', fontWeight: 'bold', color: '#6b7280', marginTop: '6px' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' },
  preview: { maxHeight: '120px', objectFit: 'contain', alignSelf: 'center', marginTop: '8px' },
  button: { padding: '15px', marginTop: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#ec4899', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }
};
