import React from 'react';

export default function Terms() {
  const styles = {
    pageWrapper: { backgroundColor: '#fdf2f8', padding: '60px 20px', direction: 'rtl', minHeight: '100vh' },
    container: { maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '50px', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' },
    title: { background: 'linear-gradient(135deg, #6d28d9, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem', marginBottom: '30px', fontWeight: '800' },
    subtitle: { color: '#4c1d95', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px' },
    text: { lineHeight: '1.8', color: '#4b5563', fontSize: '1.1rem' }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>תנאי שימוש</h1>
        <div style={styles.text}>
          <p>ברוכים הבאים ל-Sugar Rush. השימוש באתר זה כפוף לתנאים המפורטים להלן. אנא קראו אותם בעיון.</p>
          
          <h2 style={styles.subtitle}>1. קניין רוחני</h2>
          <p>כל התכנים באתר, לרבות תמונות, עיצובים, טקסטים וגרפיקה, הם רכושה הבלעדי של Sugar Rush ומוגנים על פי חוקי זכויות יוצרים. אין להעתיק או לעשות שימוש מסחרי ללא אישור בכתב.</p>
          
          <h2 style={styles.subtitle}>2. הזמנות ורכישות</h2>
          <p>הזמנות באתר יבוצעו באמצעות כרטיס אשראי מאובטח. Sugar Rush שומרת לעצמה את הזכות לבטל הזמנה במקרה של חוסר במלאי או אי-עמידה בתנאי התשלום.</p>
          
          <h2 style={styles.subtitle}>3. הגבלת אחריות</h2>
          <p>האתר מסופק "כפי שהוא". Sugar Rush לא תהיה אחראית לכל נזק עקיף או ישיר שייגרם כתוצאה משימוש באתר או מהמוצרים הנמכרים בו.</p>

          <h2 style={styles.subtitle}>4. סמכות שיפוט</h2>
          <p>על השימוש באתר יחולו אך ורק דיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט בעיר תל אביב-יפו.</p>
        </div>
      </div>
    </div>
  );
}