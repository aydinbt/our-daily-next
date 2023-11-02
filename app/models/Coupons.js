const mongoose = require("mongoose");
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: { type: String, required: true },
    discountPercent: { type: Number, required: true },
  },
  { timestamps: true }
);
const Coupons =
  mongoose.models.Coupons || mongoose.model("Coupons", couponSchema);
export default Coupons;
