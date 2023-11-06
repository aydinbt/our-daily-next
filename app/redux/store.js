import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    category: categorySlice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
