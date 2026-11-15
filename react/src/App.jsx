import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import Home from "./components/Pages/Home";
import CheckoutPage from './components/Pages/CheckoutPage';
import ThankYouPage from './components/Pages/ThankYouPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch } from 'react-redux';
import { currentUser } from './slice/AuthSlice';
import About from './components/Pages/About';
import Terms from './components/Pages/Terms';
import Privacy from './components/Pages/Privacy';
import MyOrders from './components/Pages/MyOrders';
import AddProduct from './components/Pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import AdminOrders from './components/Pages/AdminOrders';
import AdminUsers from './components/Pages/AdminUsers';
import AdminDeletedProducts from './components/Pages/AdminDeletedProducts';

// בכל כניסה לדף הבית (גם כשכבר נמצאים בו) הדף נטען מחדש: מתאפס סינון הקטגוריה והמלאי מתעדכן
function HomeRoute(props) {
  const location = useLocation();
  return <Home key={location.key} {...props} />;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  // העגלה נשמרת ב-localStorage כדי שלא תימחק ברענון הדף
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const inCart = cartItems.find((item) => item._id === product._id)?.quantity || 0;
    if (inCart >= product.unitInStock) {
      alert(product.unitInStock === 0 ? "המוצר אזל מהמלאי 😢" : "אין מספיק מלאי להוספת יחידה נוספת");
      return;
    }
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item._id !== id) return item;
          const quantity = (item.quantity || 1) + delta;
          // לא מאפשרים לעבור את כמות המלאי
          if (delta > 0 && item.unitInStock !== undefined && quantity > item.unitInStock) return item;
          return { ...item, quantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const totalItemsInCart = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  return (

    <BrowserRouter>
      <ScrollToTop />
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        toggleCart={toggleCart} 
        cartCount={totalItemsInCart}
      />
      <CartSidebar 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
        updateQuantity={updateQuantity}
      />
      <Routes>
        <Route path='/' element={<HomeRoute searchQuery={searchQuery} addToCart={addToCart} />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage cartItems={cartItems} setCartItems={setCartItems} /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/add-product" element={<ProtectedRoute adminOnly><AddProduct /></ProtectedRoute>} />
        <Route path="/edit-product/:id" element={<ProtectedRoute adminOnly><AddProduct /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/deleted-products" element={<ProtectedRoute adminOnly><AdminDeletedProducts /></ProtectedRoute>} />
      </Routes>
      <Footer />
      </BrowserRouter>
  );
}

export default App;