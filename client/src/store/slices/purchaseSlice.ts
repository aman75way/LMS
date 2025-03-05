import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../service/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/purchases`;

// ---------------- Thunks ----------------

// Initiate a purchase
export const initiatePurchase = createAsyncThunk<Purchase, { courseId: string; amount: number }>(
  "purchase/initiate",
  async (purchaseData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Purchase>(API_URL, purchaseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to initiate purchase");
    }
  }
);

// Fetch purchases for the logged-in user
export const getUserPurchases = createAsyncThunk<Purchase[]>(
  "purchase/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Purchase[]>(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user purchases");
    }
  }
);

// Fetch all purchases (likely for admin)
export const getPurchases = createAsyncThunk<Purchase[]>(
  "purchase/getPurchases",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Purchase[]>(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch purchases");
    }
  }
);

// ---------------- Initial State ----------------

const initialState: PurchaseState = {
  purchases: [],
  loading: false,
  error: null,
};

// ---------------- Slice ----------------

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePurchase.fulfilled, (state, action: PayloadAction<Purchase>) => {
        state.purchases.push(action.payload);
        state.loading = false;
      })
      .addCase(initiatePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to initiate purchase";
      })

      .addCase(getUserPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPurchases.fulfilled, (state, action: PayloadAction<Purchase[]>) => {
        state.purchases = action.payload;
        state.loading = false;
      })
      .addCase(getUserPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch user purchases";
      })

      .addCase(getPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchases.fulfilled, (state, action: PayloadAction<Purchase[]>) => {
        state.purchases = action.payload;
        state.loading = false;
      })
      .addCase(getPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch purchases";
      });
  },
});

export default purchaseSlice.reducer;
