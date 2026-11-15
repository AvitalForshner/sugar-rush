import React from 'react';

const HeroBanner = ({ onCtaClick }) => {
  return (
    <div style={styles.bannerContainer}>
      <div style={styles.contentArea}>
        <span style={styles.badge}>🔥 מהדורה מוגבלת</span>
        <h1 style={styles.mainTitle}>החמוצים שיפרקו<br />לכם את הלשון! 🍋⚡</h1>
        <p style={styles.subTitle}>חטיפים וממתקים מטורפים מכל העולם שהגיעו השבוע במשלוח מיוחד</p>
        <button 
          style={styles.ctaButton}
          onClick={onCtaClick}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          לכל החמוצים והחטיפים ➔
        </button>
      </div>
    </div>
  );
};

const styles = {
  bannerContainer: {
    background: 'linear-gradient(135deg, #ff4081 0%, #7b1fa2 100%)', 
    padding: '60px 20px',
    borderRadius: '24px',
    margin: '20px auto',
    width: '100%', 
    maxWidth: '1200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(255, 64, 129, 0.2)',
    color: '#fff',
    boxSizing: 'border-box' 
  },
  contentArea: {
    maxWidth: '600px',
    width: '100%'
  },
  badge: {
    backgroundColor: '#ffeb3b',
    color: '#222',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '15px',
  },
  mainTitle: {
    fontSize: '42px',
    fontWeight: '900',
    lineHeight: '1.2',
    margin: '0 0 15px 0',
    textShadow: '2px 2px 0px #000',
  },
  subTitle: {
    fontSize: '18px',
    margin: '0 0 30px 0',
    opacity: '0.9',
  },
  ctaButton: {
    backgroundColor: '#fff',
    color: '#7b1fa2',
    border: 'none',
    padding: '14px 32px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease',
  }
};

export default HeroBanner;