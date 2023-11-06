import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  loading: false,
};

export const getUser = createAsyncThunk("user", async () => {
  const response = await fetch("http://localhost:3000/api/auth/users");
  return await response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
