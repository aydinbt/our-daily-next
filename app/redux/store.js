import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    category: categorySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
