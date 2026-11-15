import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'],required: true, default: "customer" },
  status: { type: String,enum:['active','inActive'], required: true, default: "active" }
}, { collection: "users" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;