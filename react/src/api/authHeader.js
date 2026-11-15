// מחזיר את כותרת ההרשאה עם הטוקן השמור, לשימוש בכל קריאה שדורשת משתמש מחובר
export const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// מחלץ את הודעת השגיאה שהשרת החזיר (אם יש), אחרת הודעת ברירת מחדל
export const serverMessage = (error, fallback) =>
    error?.response?.data?.message || fallback;
