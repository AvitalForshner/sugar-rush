import React from 'react';

export default function Privacy() {
  const styles = {
    pageWrapper: { backgroundColor: '#fdf2f8', padding: '60px 20px', direction: 'rtl', minHeight: '100vh' },
    container: { maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '50px', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' },
    title: { background: 'linear-gradient(135deg, #6d28d9, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem', marginBottom: '30px', fontWeight: '800' },
    subtitle: { color: '#ec4899', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px' },
    text: { lineHeight: '1.8', color: '#4b5563', fontSize: '1.1rem' }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>מדיניות פרטיות</h1>
        <div style={styles.text}>
          <p>אנו ב-Sugar Rush מתחייבים לשמור על פרטיות הלקוחות שלנו ומכבדים את המידע האישי שלכם.</p>
          
          <h2 style={styles.subtitle}>1. איסוף מידע אישי</h2>
          <p>בעת ביצוע הזמנה או הרשמה לניוזלטר, אנו עשויים לאסוף פרטים כגון: שם מלא, כתובת משלוח, דואר אלקטרוני ומספר טלפון.</p>
          
          <h2 style={styles.subtitle}>2. שימוש במידע</h2>
          <p>המידע שנאסף ישמש אך ורק למטרות הבאות: עיבוד הזמנות, עדכון על מצב המשלוח, ושירות לקוחות איכותי. לא נעביר את פרטיכם לצד שלישי ללא אישורכם המפורש.</p>
          
          <h2 style={styles.subtitle}>3. אבטחת מידע</h2>
          <p>אנו מיישמים פרוטוקולי אבטחה מתקדמים ושימוש בטכנולוגיות הצפנה (SSL) כדי להבטיח שפרטי כרטיס האשראי והמידע האישי שלכם נשמרים מוגנים ומאובטחים בכל עת.</p>
          
          <h2 style={styles.subtitle}>4. עוגיות (Cookies)</h2>
          <p>האתר עושה שימוש ב"עוגיות" כדי לשפר את חוויית הגלישה שלכם ולהתאים את התכנים להעדפות האישיות שלכם.</p>
        </div>
      </div>
    </div>
  );
}