import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
},
{ collection: "categories" }); 

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;