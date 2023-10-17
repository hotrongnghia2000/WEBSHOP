import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/user";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await userApi.getCurrent();
    if (!response.status) return rejectWithValue(response);
    return response.data.data;
  },
);
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (data, { rejectWithValue }) => {
    const response = await userApi.refreshToken();
    if (response.status !== 200) return rejectWithValue(response);
    return response.data.accessToken;
  },
);
