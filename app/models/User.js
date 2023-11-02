const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    adress: [
      {
        public_id: { type: mongoose.Schema.Types.ObjectId },
        adressAll: {
          type: String,
          required: true,
          default: "Adres Mevcut Değildir.",
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
