import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true, default: 'pending' },
  paymentNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true, default: 'card' },
  transactionId: { type: String }
}, { collection: 'payments' });

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;