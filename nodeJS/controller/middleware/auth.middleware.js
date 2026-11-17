import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header('Authorization');
        
        if (!token) {
            return res.status(401).json({ message: "גישה נדחתה: חסר טוקן אימות" });
        }
        
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trim();
        }
        
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        
        req.user = decoded;
        next();
    } catch (err) {
        // 401 = לא מזוהה (טוקן מזויף או שפג תוקפו). 403 שמור למי שמזוהה אבל אין לו הרשאה (verifyAdmin)
        res.status(401).json({ message: "טוקן לא חוקי או שפג תוקפו", error: err.message });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "גישה נדחתה: אין לך הרשאות מנהל" });
    }
}