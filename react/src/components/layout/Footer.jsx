import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
    
        <div style={styles.section}>
          <h3 style={styles.title}>SUGAR RUSH 🍭</h3>
          <p style={styles.text}>המתוקים הכי טעימים בעיר!</p>
        </div>


        <div style={styles.section}>
          <h4 style={styles.subtitle}>ניווט מהיר</h4>
          <div style={styles.linkGroup}>
            <Link to="/" style={styles.link}>דף הבית</Link>
            <Link to="/about" style={styles.link}>אודות</Link>
          </div>
        </div>


        <div style={styles.section}>
          <h4 style={styles.subtitle}>מידע משפטי</h4>
          <div style={styles.linkGroup}>
            <Link to="/terms" style={styles.link}>תנאי שימוש</Link>
            <Link to="/privacy" style={styles.link}>מדיניות פרטיות</Link>
          </div>
        </div>

       <div style={styles.section}>
        <h4 style={styles.subtitle}>נשמח ליצור קשר</h4>
        <div style={styles.contactInfo}>
          <a href="mailto:info@sugarrush.com" style={styles.link}>📧 info@sugarrush.com</a>
          <a href="tel:0501234567" style={styles.link}>📞 050-1234567</a>
        </div>
      </div>
      </div>
      
      <div style={styles.copyright}>
        © {new Date().getFullYear()} Sugar Rush. כל הזכויות שמורות.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #4c1d95 0%, #be185d 100%)', 
    color: '#ffffff',
    padding: '60px 20px',
    marginTop: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 -10px 20px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
  },
  title: { fontSize: '28px', marginBottom: '15px', letterSpacing: '1px' },
  link: { 
    textDecoration: 'none', 
    color: '#fce7f3', 
    fontSize: '16px',
    transition: '0.3s',
    display: 'block',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  input: {
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    marginBottom: '10px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#fbbf24',
    color: '#4c1d95',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  copyright: {
    textAlign: 'center',
    marginTop: '40px',
    opacity: 0.7,
    fontSize: '14px',
    borderTop: '1px solid rgba(255,255,255,0.2)',
    paddingTop: '20px'
  }
};