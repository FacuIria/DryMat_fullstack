import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/homeSlice";
import faqsReducer from "./slices/faqsSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    faqs: faqsReducer,
    contact: contactReducer,
  },
});
