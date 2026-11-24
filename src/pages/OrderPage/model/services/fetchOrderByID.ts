import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { IBook } from "entities/Book";

interface IFetchOrderByIdProps {
  orderId: number | undefined;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IBook;
}

export const fetchOrderByID = createAsyncThunk<
  IBook, IFetchOrderByIdProps, IThunkConf<string>
>(
  "bookDetails/fetchBookById",
  async ({ orderId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    try {
      if (!orderId) {
        throw new Error("fetchOrderByID: no orderId");
      }

      const response = await extra.axios.get<ICustomReturnedData>(
        `/books/${orderId}`,
        { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        return rejectWithValue(`${response.data.message}`);
      }

      // dispatch(profileActions.setProfileData(response.data.data));

      // extra.navigate("/");
      return response.data.data;
    } catch (e) {
      return rejectWithValue("ошибка");
    }
  }
);
