import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: "",
  },
  reducers: {
    loggedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loggedIn } = authSlice.actions;

export default authSlice.reducer;
