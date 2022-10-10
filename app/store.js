import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slices/formSlice";

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    form: formReducer,
  },
});