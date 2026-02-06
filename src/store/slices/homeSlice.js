import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

export const fetchHome = createAsyncThunk("home/fetch", async () => {
  const { data } = await http.get("/api/home");
  return data;
});

const homeSlice = createSlice({
  name: "home",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Error al cargar Home";
      });
  },
});

export default homeSlice.reducer;
