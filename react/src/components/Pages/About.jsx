import React from 'react';

const About = () => {
  const colors = {
    primary: '#6d28d9', 
    secondary: '#ec4899', 
    accent: '#fbbf24', 
    textDark: '#1f2937',
    textLight: '#6b7280',
    background: '#fdf2f8', 
    cardBg: '#ffffff'
  };

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      backgroundColor: colors.background,
      padding: '40px 0',
      direction: 'rtl',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 20px',
    },
    headerSection: {
      textAlign: 'center',
      marginBottom: '60px',
      position: 'relative',
      padding: '40px 0',
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      color: colors.primary,
      margin: '0 0 20px 0',
      letterSpacing: '-1px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    heroImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      marginBottom: '-100px',
      position: 'relative',
      zIndex: 1
    },
    mainContent: {
      backgroundColor: colors.cardBg,
      padding: '120px 40px 50px 40px', 
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.background}`
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: colors.secondary,
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
    },
    underline: {
      height: '4px',
      width: '60px',
      backgroundColor: colors.accent,
      borderRadius: '2px',
      marginTop: '10px',
      marginBottom: '30px'
    },
    paragraph: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: colors.textDark,
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '40px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      border: '1px solid #eee',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
    },
    cardIcon: {
      fontSize: '36px',
      marginBottom: '15px',
    },
    cardHeading: {
      fontSize: '20px',
      fontWeight: '600',
      color: colors.primary,
      marginBottom: '8px',
    },
    cardText: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: colors.textLight,
    },
    '@media (max-width: 768px)': {
      title: { fontSize: '36px' },
      sectionTitle: { fontSize: '28px' },
      paragraph: { fontSize: '16px' },
      mainContent: { padding: '80px 20px 30px 20px' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' },
      card: { padding: '15px' },
      cardIcon: { fontSize: '28px', marginBottom: '10px' },
      cardHeading: { fontSize: '18px' },
      cardText: { fontSize: '14px' }
    }
  };

  const valuesData = [
    { icon: '✨', heading: 'איכות ללא פשרות', text: 'אנחנו מתחייבים לספק לכם את המוצרים הטריים והאיכותיים ביותר.' },
    { icon: '💖', heading: 'שירות עם חיוך', text: 'הלקוחות שלנו בראש סדר העדיפויות. אנחנו כאן לכל שאלה ובקשה.' },
    { icon: '🚀', heading: 'חדשנות מתמדת', text: 'אנחנו תמיד מחפשים את הטרנדים הכי חמים בעולם הממתקים.' },
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        <div style={styles.headerSection}>
          <h1 style={styles.title}>הסיפור המתוק של Sugar Rush</h1>
        </div>

        <div style={styles.mainContent}>
          <section style={{ marginBottom: '50px' }}>
            <h2 style={styles.sectionTitle}>מי אנחנו?</h2>
            <div style={styles.underline}></div>
            <p style={styles.paragraph}>
              ברוכים הבאים לעולם של Sugar Rush! אנחנו לא רק חנות ממתקים – אנחנו חוויה של אושר טהור. 
              המסע שלנו התחיל מאהבה פשוטה לכל מה שמתוק, ומחלום להביא את הטעמים הכי מרגשים, 
              הכי חדשים והכי נוסטלגיים ישירות אליכם.
            </p>
            <p style={styles.paragraph}>
              הצוות שלנו עובד מסביב לשעון כדי לאצור מבחר אינסופי של הפתעות, 
              משוקולדים יוקרתיים ועד לממתקים ויראליים מכל העולם. כל מוצר נבחר בקפידה 
              כדי להבטיח שכל ביס יהיה לא פחות ממושלם.
            </p>
          </section>

          <section>
            <h2 style={styles.sectionTitle}>הערכים שלנו</h2>
            <div style={styles.underline}></div>
            <div style={styles.grid}>
              
              {valuesData.map((value, index) => (
                <div key={index} style={styles.card}>
                  <div style={styles.cardIcon}>{value.icon}</div>
                  <h3 style={styles.cardHeading}>{value.heading}</h3>
                  <p style={styles.cardText}>{value.text}</p>
                </div>
              ))}

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;