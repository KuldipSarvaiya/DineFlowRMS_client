import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const clientSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signOut: (currState, action) => {
      return initialState;
    },
  },
});

export const { signOut } = clientSlice.actions;

export default clientSlice;
