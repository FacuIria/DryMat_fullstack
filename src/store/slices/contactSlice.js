import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

export const sendContact = createAsyncThunk(
  "contact/send",
  async (payload) => {
    const { data } = await http.post("/api/contact", payload);
    return data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: { status: "idle", error: null, lastResponse: null },
  reducers: {
    resetContactState: (state) => {
      state.status = "idle";
      state.error = null;
      state.lastResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.lastResponse = null;
      })
      .addCase(sendContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastResponse = action.payload;
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Error al enviar contacto";
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
