import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/purchases`;

export const initiatePurchase = createAsyncThunk("purchase/initiate", async (purchaseData) => {
  const response = await axios.post(API_URL, purchaseData);
  return response.data;
});

export const getUserPurchases = createAsyncThunk("purchase/getUser", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: { purchases: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserPurchases.fulfilled, (state, action) => {
      state.purchases = action.payload;
    });
  },
});

export default purchaseSlice.reducer;
