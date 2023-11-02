const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewsSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    img: {
      type: String,
      required: true,
      default:
        "https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png",
    },
    description: { type: String, required: false, default: "." },
    option: [{ type: String, required: false }],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number, required: false },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    reviews: [ReviewsSchema],
  },
  { timestamps: true }
);
const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Products;
