import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

const AuthController = {
    // GET
    getCurrentUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user)
                return res.status(404).json({ message: 'המשתמש לא נמצא' });
            res.status(200).json({ user });
        }
        catch (error) {
            console.error("Server Error in getCurrentUser:", error);
            res.status(500).json({ message: 'שגיאת שרת' });
        }
    },

    // POST
    register: async (req, res) => {
        try {
            const { firstName, email, password} = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser)
                return res.status(400).json({ message: "משתמש עם אימייל זה כבר קיים במערכת" });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                userName: firstName,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            const token = jwt.sign(
                { id: newUser._id, role: newUser.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }  
            );
            const userResponse = newUser.toObject();
            delete userResponse.password;
            res.status(200).json({ user: userResponse, token });
        }
        catch (err) {
            console.error("Error in register:", err);
            res.status(500).json({ error: err.message });
        }
    },

    // POST
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email, status: 'active' });
            if (!user)
                return res.status(404).json({ message: "משתמש לא נמצא" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: "סיסמה שגויה" });

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.status(200).json({ user: userResponse, token });
        }
        catch (err) {
            console.error("Error in login:", err);
            res.status(500).json({ error: err.message });
        }
    }
};

export default AuthController;