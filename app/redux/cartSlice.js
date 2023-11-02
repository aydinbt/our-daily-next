// sepetslice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const newQuantity = action.payload.quantity;

      const itemIdToUpdate = action.payload.itemId;

      const itemToUpdate = state.items.find(
        (item) => item._id === itemIdToUpdate
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
    addToCart: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity = quantity + 1;
      } else {
        state.items.push({ ...action.payload });
      }

      state.total = state.items.reduce((total, item) => {
        return total + item.quantity * item.price.current;
      }, 0);
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.items = state.items.filter((item) => item._id !== itemToRemove._id);

      state.total = state.items.reduce((total, item) => {
        return total + item.quantity * item.price.current;
      }, 0);
    },
    removeSingleCart: (state, action) => {
      const itemToRemove = action.payload;

      const item = state.items.find((item) => item._id === itemToRemove._id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item._id !== itemToRemove._id
        );
      }

      state.total = state.items.reduce((total, item) => {
        return total + item.quantity * item.price.current;
      }, 0);
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((total, item) => {
        return total + item.quantity * item.price.current;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeSingleCart,
  calculateTotal,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
