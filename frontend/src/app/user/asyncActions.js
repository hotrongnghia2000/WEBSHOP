import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/user";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await userApi.getCurrent();
    if (!response.status) return rejectWithValue(response);
    return response;
  },
);
