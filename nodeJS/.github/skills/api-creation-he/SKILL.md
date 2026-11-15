---
name: api-creation-he
description: Skill בעברית ליצירת APIים ב-Node.js + Express + MongoDB עבור הפרויקט הזה.
---

# Skill: יצירת APIים בפרויקט זה

## מטרה
סקיל זה מנחה את ה-AI כיצד לבנות APIים חדשים בפרויקט זה בצורה עקבית, ברורה ומתאימה למבנה הקיים.

## עקרונות בסיסיים
- השתמש ב-ES modules: import / export.
- שמור על מבנה הפרויקט הקיים: routers/, controller/, models/.
- בכל API חדש, הוסף בדרך כלל שלושה חלקים:
  - router בקובץ ב-routers/
  - controller בקובץ ב-controller/
  - model בקובץ ב-models/
- אם צריך, הוסף את ה-route ב-app.js.

## מבנה מומלץ ל-API
לכל resource יש להקפיד על המבנה הבא:
- GET /resource/getAll
- GET /resource/getById/:id
- POST /resource/addResource
- PUT /resource/updateResource/:id
- DELETE /resource/deleteResource/:id

## הנחיות לכתיבת קוד
- השתמש ב-async/await.
- עטוף כל פעולה ב-try/catch.
- החזר סטטוס HTTP מתאים:
  - 200 עבור הצלחה
  - 201 עבור יצירה
  - 400 עבור בקשה לא תקינה
  - 404 עבור לא נמצא
  - 500 עבור שגיאה שרת
- החזר JSON ברור עם הודעה מתאימה.
- שמור על שמות קבועים: getAll, getById, addX, updateX, deleteX.

## MongoDB / Mongoose
- הגדירו schema בקובץ models/.
- השתמשו בשדות עם validation לפי הצורך.
- שקלו אם צריך להוסיף unique, required, enum או default.
- שמרו על שם האוסף עקבי עם הסגנון הקיים.

## אימות והרשאות
- אם ה-API מוגן, השתמש ב-middleware כמו verifyToken ו-verifyAdmin.
- אל תחליש אבטחה אלא אם המשתמש ביקש זאת במפורש.

## תהליך עבודה מומלץ
1. קרא את ה-router, ה-controller וה-model הרלוונטיים.
2. הבן את המבנה הקיים לפני שינוי.
3. הוסף את ה-API בצורה מינימליסטית.
4. ודא שה-route מחובר ב-app.js אם נדרש.
5. בדוק שהקוד מתאים לסגנון של הפרויקט.

## דוגמה לתבנית
```js
// router
router.get('/getAll', controller.getAll);

// controller
const getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

## כללים חשובים
- אל תבצע refactor מיותר.
- שמור על פונקציונליות קיימת unless user explicitly asks to change it.
- אם יש ספק, תכנן פתרון פשוט, ברור ו-production-ready.