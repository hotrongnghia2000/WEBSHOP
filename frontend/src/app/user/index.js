import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

// mỗi slide sẽ quản lý một state
const slice = createSlice({
  // name này được đặt cho type trong action, vd: 'user/login'
  name: "user",
  // khởi tạo state là một đối tượng
  initialState: {
    isLogged: false,
    current: null,
    token: null,
    isLoading: false,
    isExpireLogin: false,
  },
  // định nghĩa các function sẽ làm việc với state
  // ứng với mỗi action, sẽ cho ra một state duy nhất
  reducers: {
    login: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLogged = false;
      state.token = null;
      state.current = null;
      state.isExpireLogin = false;
    },
  },
  extraReducers: (builder) => {
    //
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
    });

    //
    builder.addCase(actions.refreshToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(actions.refreshToken.rejected, (state, action) => {
      state.isLogged = false;
      state.isExpireLogin = true;
    });
  },
});

// dispatch sẽ nhận vào một reducer và một action để thay đổi state
// xuất ra để truyền vào dispatch
export const { login, logout, clearIsExpireLogin } = slice.actions;

// xuất ra để truyền váo store
export default slice.reducer;
