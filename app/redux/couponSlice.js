import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupon: [],
  loading: false,
};

export const getCoupons = createAsyncThunk("coupon", async () => {
  const response = await fetch("http://localhost:3000/api/coupons");
  return await response.json();
});

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
    });
  },
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
