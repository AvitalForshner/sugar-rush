import Payment from '../models/payments.model.js';
import Order from '../models/orders.model.js';

const PaymentController = {
  getAll: async (req, res) => {
    try {
      const data = await Payment.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Payment.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'not found' });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  },

  addPayment: async (req, res) => {
    try {
      const newItem = new Payment(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updatePayment: async (req, res) => {
    try {
      const item = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ error: 'not found' });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  },

  deletePayment: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findByIdAndDelete(id);
      res.status(200).json({ id });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  }
};

export default PaymentController;