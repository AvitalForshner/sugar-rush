import Product from '../models/products.model.js';

const ProductController = {
    getAll: async (req, res) => {
        try {
            const data = await Product.find({ status: 'active' });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // מוצרים שנמחקו (מחיקה רכה) - למנהל, כדי שיוכל לשחזר אותם
    getInactive: async (req, res) => {
        try {
            const data = await Product.find({ status: 'inactive' });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getById: async (req, res) => {
        try {
            const item = await Product.findById(req.params.id);
            if (!item) return res.status(400).json({ error: "not found" });
            res.status(200).json(item);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    addProduct: async (req, res) => {
        try {
            const newItem = new Product(req.body);
            await newItem.save();
            res.status(200).json(newItem);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) return res.status(404).json({ error: "not found" });

            // מעדכנים רק שדות שנשלחו, כדי שעדכון חלקי לא ימחק שדות אחרים
            const fields = ['name', 'description', 'price', 'status', 'imageURL', 'categoryId', 'unitInStock'];
            for (const field of fields) {
                if (req.body[field] !== undefined) product[field] = req.body[field];
            }
            await product.save();
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const products = await Product.find({ categoryId: categoryId, status: 'active' });
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            // מחיקה רכה: המוצר מסומן כלא פעיל ונעלם מהחנות, אבל הוא נשמר כדי שהזמנות ישנות ימשיכו להציג אותו
            const product = await Product.findByIdAndUpdate(id, { status: "inactive" });
            if (!product) return res.status(404).json({ error: "not found" });
            res.status(200).json({ message: "Product deleted successfully", id });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default ProductController;