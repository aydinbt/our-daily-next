const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);
const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
