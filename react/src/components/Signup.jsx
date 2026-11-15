import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../slice/AuthSlice';

export default function Signup() {
  const [formData, setFormData] = useState({ firstName: '', email: '', password: '' });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth || {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      firstName: formData.firstName, 
      email: formData.email,
      password: formData.password
    };

    try {
      await dispatch(registerUser(dataToSend)).unwrap();
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      const errorMessage = err?.message || err || "אירעה שגיאה";
      alert("שגיאה בהרשמה: " + errorMessage);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <h1>הרשמה 🍭</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="שם פרטי" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} style={styles.input} required />
          <input type="email" placeholder="אימייל" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} required />
          <input type="password" placeholder="סיסמה" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={styles.input} required />
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "רושמת אותך..." : "הירשמי עכשיו"}
          </button>
        </form>
      </div>
    </div>
  );
}
const styles = {
  pageContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',
    fontFamily: 'system-ui, sans-serif',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '25px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#4b5563',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 20px',
    borderRadius: '50px',
    border: '2px solid #f3e8ff',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '50px',
    border: 'none',
    backgroundColor: '#ec4899',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.2s',
  }
};