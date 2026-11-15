import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
  productsList: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, { collection: "shoppingCarts" });

const ShoppingCart = mongoose.models.ShoppingCart || mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;