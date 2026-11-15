import React from 'react';

const categoriesData = [
  { id: 1, name: 'ממתקים', emoji: '🍬', color: '#ffeb3b', path: '/sweet' },
  { id: 2, name: 'חטיפים', emoji: '🥨', color: '#b3e5fc', path: '/snacks' },
  { id: 3, name: 'שוקולדים', emoji: '🍫', color: '#ccff90', path: '/Chocolates' },
  { id: 4, name: 'sweetBOX', emoji: '🎁', color: '#f8bbd0', path: '/sweetBOX' },
];

// הקטגוריה הנבחרת נשמרת בדף הבית, שם היא משולבת עם החיפוש.
// לחיצה על קטגוריה שכבר נבחרה מבטלת את הבחירה.
const CategoryCircles = ({ selectedCategory, onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(selectedCategory === category.id ? null : category.id);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>מה בא לכם היום? 🧐</h2>
    
      <div style={{...styles.circlesGrid, direction: 'ltr'}}>
        {[...categoriesData].reverse().map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <div key={category.id} style={styles.circleWrapper} onClick={() => handleCategoryClick(category)}>
              <div style={{ 
                ...styles.circle, 
                backgroundColor: category.color,
                boxShadow: isSelected ? `0 0 20px ${category.color}` : '0 8px 16px rgba(0,0,0,0.06)',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)'
              }}>
                <span style={styles.emoji}>{category.emoji}</span>
              </div>
              <span style={{...styles.categoryName, direction: 'rtl'}}>{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { width: '100%', margin: '40px 0', textAlign: 'center' },
  title: { fontSize: '26px', fontWeight: '900', color: '#7b1fa2', marginBottom: '25px' },
  circlesGrid: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '30px', 
    flexWrap: 'wrap',
    direction: 'ltr',
    textAlign: 'center'
  },
  circleWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '120px' },
  circle: { width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' },
  emoji: { fontSize: '40px' },
  categoryName: { marginTop: '10px', fontSize: '16px', fontWeight: 'bold', color: '#333' }
};

export default CategoryCircles;