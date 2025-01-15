// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "../initialStates/userInitialState";

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export const isLoggedIn = (state) => state.user.authenticated;

export default userSlice.reducer;