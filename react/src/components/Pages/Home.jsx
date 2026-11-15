import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../home/HeroBanner';
import CategoryCircles from '../home/CategoryCircles';
import BestSellers from '../home/BestSellers';
import { getAllProducts, deleteProduct } from '../../api/productsApi';
import { getBestSellers } from '../../api/ordersApi';

const sortOptions = {
  default: { label: 'מומלץ', compare: null },
  priceAsc: { label: 'מחיר: מהזול ליקר', compare: (a, b) => a.price - b.price },
  priceDesc: { label: 'מחיר: מהיקר לזול', compare: (a, b) => b.price - a.price },
};

export default function Home({ searchQuery, addToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [bestSellerIds, setBestSellerIds] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAdmin = isAuthenticated && user?.role === 'admin';
  const navigate = useNavigate();
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const data = await getAllProducts();
        setAllProducts(data);
      } catch (err) {
        console.error("שגיאה בטעינת מוצרים:", err);
      }
    };
    fetchInitialProducts();
    // הנמכרים ביותר מחושבים בשרת לפי ההזמנות. שומרים רק את הסדר (מזהים) והנתונים עצמם נלקחים מרשימת המוצרים
    getBestSellers(4)
      .then((data) => setBestSellerIds(data.map((p) => p._id)))
      .catch(() => setBestSellerIds([]));
  }, []);

  const bestSellers = bestSellerIds
    .map((id) => allProducts.find((p) => p._id === id))
    .filter(Boolean);

  // סינון משולב: קטגוריה + חיפוש (שניהם יחד, על המוצרים שכבר נטענו)
  const query = searchQuery.trim().toLowerCase();
  const products = allProducts.filter((p) =>
    (selectedCategory === null || p.categoryId === selectedCategory) &&
    (query === '' || p.name.toLowerCase().includes(query))
  );

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEdit = (product) => navigate(`/edit-product/${product._id}`);

  const handleDelete = async (product) => {
    if (!window.confirm(`למחוק את "${product.name}" מהחנות?`)) return;
    try {
      await deleteProduct(product._id);
      setAllProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert(err.message);
    }
  };

  const compare = sortOptions[sortBy].compare;
  const displayedProducts = compare ? [...products].sort(compare) : products;

  return (
    <div style={{ direction: 'rtl', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {isAuthenticated && (
          <h2 style={{ color: '#7c3aed', marginTop: '20px' }}>
            איזה כיף שחזרת, {user?.userName}! 🍭
          </h2>
        )}

        <HeroBanner onCtaClick={scrollToProducts} />
        <div ref={productsRef} style={{ width: '100%', scrollMarginTop: '90px' }}>
          <CategoryCircles selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>

        {/* "הכי נמכרים" מוצג רק כשלא מחפשים ולא מסננים, כדי לא לבלבל עם התוצאות */}
        {bestSellers.length > 0 && query === '' && selectedCategory === null && (
          <BestSellers
            title="הכי נמכרים 🌟"
            products={bestSellers}
            addToCart={addToCart}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <div style={styles.sortBar}>
          <label htmlFor="sort" style={styles.sortLabel}>מיון לפי:</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.sortSelect}>
            {Object.entries(sortOptions).map(([key, option]) => (
              <option key={key} value={key}>{option.label}</option>
            ))}
          </select>
        </div>

        {displayedProducts.length === 0 ? (
          <p>לא מצאנו מוצרים שעונים על החיפוש שלך 🍭</p>
        ) : (
          <BestSellers
            products={displayedProducts}
            addToCart={addToCart}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  sortBar: { display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-start', padding: '0 20px' },
  sortLabel: { fontWeight: 'bold', color: '#7b1fa2' },
  sortSelect: { padding: '8px 14px', borderRadius: '20px', border: '2px solid #f3e5f5', fontSize: '15px', backgroundColor: 'white', cursor: 'pointer' },
};
