import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', direction: 'rtl' }}>
      <h1 style={{ color: '#9333ea' }}>תודה על ההזמנה! 🍭</h1>
      <p style={{ fontSize: '18px', color: '#4b5563' }}>ההזמנה שלך בדרך אליך ותגיע בקרוב מאוד!</p>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '20px', padding: '10px 30px', background: '#ec4899', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}
      >
        חזרה לעמוד הבית
      </button>
    </div>
  );
}