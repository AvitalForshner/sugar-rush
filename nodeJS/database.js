import mongoose from "mongoose";

// כתובת מסד הנתונים מגיעה מקובץ ה-.env (DB_URI). אם לא הוגדרה - עובדים מול MongoDB מקומי
const uri = process.env.DB_URI || "mongodb://localhost:27017/candys";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    }
    catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database connected', mongoose.connection.name);
});

export default connectDB;
