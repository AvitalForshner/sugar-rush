import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slice/AuthSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // אם הגענו לכאן מדף מוגן (למשל תשלום) - נחזור אליו אחרי ההתחברות
  const redirectTo = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate(redirectTo, { replace: true });
    } else {
      alert(result.payload || "שגיאה בהתחברות!");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>התחברות לחשבון 🐻</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="email" 
            placeholder="אימייל" 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input} 
            required 
          />
          <input 
            type="password" 
            placeholder="סיסמה" 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
            required 
          />
          <button type="submit" style={styles.button}>התחברות</button>
          <p style={{ marginTop: '20px', color: '#6b7280' }}>
            אין לך חשבון?{' '}
            <span 
                style={{ color: '#ec4899', cursor: 'pointer', fontWeight: 'bold' }} 
                onClick={() => navigate('/signup', { state: location.state })}
            >
                הירשמי כאן
            </span>
          </p>
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