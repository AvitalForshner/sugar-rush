import ShoppingCart from '../models/shoppingCarts.model.js';

const shoppingCartController = {
//GET
  getAll: async (req, res) => {
    try {
      const data = await ShoppingCart.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
//GETBYID
  getById: async (req, res) => {
    try {
      const cart = await ShoppingCart.findById(req.params.id);
      if (!cart) return res.status(404).json({ error: "not found" });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
//POST
  addShoppingCart: async (req, res) => {
    try {
      const newCart = new ShoppingCart(req.body);
      await newCart.save();
      res.status(201).json(newCart);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
//PUT
  updateShoppingCart: async (req, res) => {
    try {
      const cart = await ShoppingCart.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cart) return res.status(404).json({ error: "not found" });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
//DELETE
  deleteShoppingCart: async (req, res) => {
    try {
      const { id } = req.params;
      await ShoppingCart.findByIdAndDelete(id);
      res.status(200).json({id});
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default shoppingCartController;