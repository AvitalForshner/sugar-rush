import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  totalPrice: { 
    type: Number, 
    required: true 
  },

  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed', 'cancelled'],
    default: "pending" 
  },

  date: { 
    type: Date, 
    default: Date.now 
  },

  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      },
      price: { 
        type: Number, 
        required: true 
      }
    }
  ]

}, { collection: "orders" });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;