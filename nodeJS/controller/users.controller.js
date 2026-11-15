import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';

const isSelfOrAdmin = (req) => req.user.role === 'admin' || String(req.user.id) === String(req.params.id);

const UserController = {
    //GET (מנהל בלבד)
    getAll: async (req, res) => {
        try {
            const data = await User.find().select('-password');
            res.status(200).json(data);
        }
        catch (err) {
            console.error("FULL ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    },
    //GETBYID - המשתמש עצמו או מנהל
    getById: async (req, res) => {
        try {
            if (!isSelfOrAdmin(req))
                return res.status(403).json({ message: "אין לך הרשאה לצפות במשתמש זה" });
            const user = await User.findById(req.params.id).select('-password');
            if (!user)
                return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        }
        catch (err) {
            console.error("FULL ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    },
    //POST (מנהל בלבד) - הוספת משתמש עם סיסמה מוצפנת
    addUser: async (req, res) => {
        const { userName, email, password, role, status } = req.body;
        try {
            if (!password)
                return res.status(400).json({ message: "חסרה סיסמה" });
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ userName, email, password: hashedPassword, role, status });
            await newUser.save();
            const userResponse = newUser.toObject();
            delete userResponse.password;
            res.status(200).json(userResponse);
        }
        catch (err) {
            console.error("FULL ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    },
    //PUT - המשתמש עצמו או מנהל. רק מנהל יכול לשנות תפקיד/סטטוס
    updateUser: async (req, res) => {
        try {
            if (!isSelfOrAdmin(req))
                return res.status(403).json({ message: "אין לך הרשאה לעדכן משתמש זה" });

            const user = await User.findById(req.params.id);
            if (!user)
                return res.status(404).json({ error: "User not found" });

            const { userName, email, password, role, status } = req.body;
            if (userName !== undefined) user.userName = userName;
            if (email !== undefined) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10);
            if (req.user.role === 'admin') {
                // מנהל לא יכול להוריד לעצמו הרשאות או לחסום את עצמו (כדי שלא יינעל מחוץ למערכת)
                const isSelf = String(req.user.id) === String(user._id);
                if (isSelf && ((role !== undefined && role !== 'admin') || (status !== undefined && status !== 'active')))
                    return res.status(400).json({ message: "אי אפשר לשנות את ההרשאות או הסטטוס של החשבון שלך" });
                if (role !== undefined) user.role = role;
                if (status !== undefined) user.status = status;
            }
            await user.save();

            const userResponse = user.toObject();
            delete userResponse.password;
            res.status(200).json(userResponse);
        }
        catch (err) {
            console.error("FULL ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    },
    //DELETE (מנהל בלבד) - מחיקה רכה: המשתמש הופך ללא פעיל
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await User.findByIdAndUpdate(id, { status: 'inActive' });
            res.status(200).json({ id });
        }
        catch (err) {
            console.error("FULL ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    }
};
export default UserController;
