import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IBook, IBookDetailsStateSchema } from "../types";

import { IOrderPageStateSchema } from "../types";
import { fetchOrderByID } from "../services/fetchOrderByID";
import { IBook } from "entities/Book";
import { ORDER_LOCAL_STORAGE_KEY } from "resources/application";

const initialState: IOrderPageStateSchema = { //IBookDetailsStateSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    sendOrder: (state, action: PayloadAction<string>) => {
      // state.orderSending = action.payload;
      localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByID.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchOrderByID.fulfilled, (state, action: PayloadAction<IBook>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;
