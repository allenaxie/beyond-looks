import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../slices/templateSlice";

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    template: templateReducer,
  },
});