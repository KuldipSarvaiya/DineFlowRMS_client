import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";

const store = configureStore({
  reducer: {
    client: clientSlice,
  },
});

export default store;
