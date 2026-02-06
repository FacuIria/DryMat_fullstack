import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

export const fetchFaqs = createAsyncThunk("faqs/fetch", async () => {
  const { data } = await http.get("/api/faqs");
  return data;
});

const faqsSlice = createSlice({
  name: "faqs",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Error al cargar FAQs";
      });
  },
});

export default faqsSlice.reducer;
