import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  loading: false,
};

export const getCategory = createAsyncThunk("category", async () => {
  const response = await fetch("http://localhost:3000/api/categories");
  return await response.json();
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
