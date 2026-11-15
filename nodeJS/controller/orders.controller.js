import Order from '../models/orders.model.js';
import Product from '../models/products.model.js';

const isOwnerOrAdmin = (order, user) =>
  user.role === 'admin' || String(order.userId?._id || order.userId) === String(user.id);

const OrderController = {
  //GET - כל ההזמנות (מנהל בלבד)
  getAll: async (req, res) => {
    try {
      const data = await Order.find()
        .populate("userId", "-password")
        .populate("products.productId")
        .sort({ date: -1 });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //GET - ההזמנות של המשתמש המחובר
  getMyOrders: async (req, res) => {
    try {
      // req.user.id מגיע מה-Middleware של ה-verifyToken
      const orders = await Order.find({ userId: req.user.id })
        .populate("products.productId")
        .sort({ date: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //GET - המוצרים הנמכרים ביותר (לפי כמות יחידות בהזמנות שלא בוטלו). ציבורי - מחזיר רק מוצרים, בלי פרטי לקוחות
  getBestSellers: async (req, res) => {
    try {
      const limit = Math.min(Number(req.query.limit) || 4, 20);
      const result = await Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $unwind: '$products' },
        { $group: { _id: '$products.productId', soldCount: { $sum: '$products.quantity' } } },
        { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
        { $unwind: '$product' },
        { $match: { 'product.status': 'active' } },
        { $sort: { soldCount: -1 } },
        { $limit: limit },
      ]);
      res.status(200).json(result.map((r) => ({ ...r.product, soldCount: r.soldCount })));
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //GETBYID
  getById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("products.productId");
      if (!order) return res.status(404).json({ error: "not found" });
      if (!isOwnerOrAdmin(order, req.user))
        return res.status(403).json({ message: "אין לך הרשאה לצפות בהזמנה זו" });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //POST - יצירת הזמנה. המחירים והמלאי נבדקים מול ה-DB ולא נלקחים מהלקוח
  addOrder: async (req, res) => {
    try {
      const items = req.body.products;
      if (!Array.isArray(items) || items.length === 0)
        return res.status(400).json({ message: "ההזמנה ריקה" });

      const orderProducts = [];
      let totalPrice = 0;

      for (const item of items) {
        const quantity = Number(item.quantity);
        if (!Number.isInteger(quantity) || quantity < 1)
          return res.status(400).json({ message: "כמות לא תקינה" });

        const product = await Product.findById(item.productId);
        if (!product || product.status !== 'active')
          return res.status(400).json({ message: "אחד המוצרים בהזמנה לא קיים" });
        if (product.unitInStock < quantity)
          return res.status(400).json({ message: `אין מספיק מלאי עבור ${product.name}` });

        orderProducts.push({ productId: product._id, quantity, price: product.price });
        totalPrice += product.price * quantity;
      }

      // הורדת המלאי
      for (const item of orderProducts) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { unitInStock: -item.quantity } });
      }

      const newOrder = new Order({
        userId: req.user.id,
        products: orderProducts,
        totalPrice: Math.round(totalPrice * 100) / 100,
        status: 'pending'
      });
      await newOrder.save();
      await newOrder.populate("products.productId");
      res.status(201).json(newOrder);
    } catch (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  },

  //PUT - מנהל יכול לעדכן סטטוס, משתמש רגיל יכול רק לבטל הזמנה שלו שעדיין ממתינה
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "not found" });
      if (!isOwnerOrAdmin(order, req.user))
        return res.status(403).json({ message: "אין לך הרשאה לעדכן הזמנה זו" });

      const { status } = req.body;
      if (req.user.role !== 'admin') {
        if (status !== 'cancelled' || order.status !== 'pending')
          return res.status(403).json({ message: "ניתן לבטל רק הזמנה שעדיין ממתינה" });
      }

      // ביטול הזמנה מחזיר את המוצרים למלאי
      if (status === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.products) {
          await Product.findByIdAndUpdate(item.productId, { $inc: { unitInStock: item.quantity } });
        }
      }

      if (status) order.status = status;
      await order.save();
      await order.populate("products.productId");
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //DELETE
  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).json({ error: "not found" });
      res.status(200).json({ message: "Order deleted successfully", id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default OrderController;
