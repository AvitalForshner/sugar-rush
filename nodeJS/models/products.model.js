import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  status: { type: String,enum: ['active','inactive'], required: true, default: "active" },
  imageURL: { type: String },
  categoryId: { type: Number },
  unitInStock: { type: Number, required: true, default: 0 }
}, { collection: "products" });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;