import { createSlice } from "@reduxjs/toolkit";

// mỗi slide sẽ quản lý một state
const slice = createSlice({
  // name này được đặt cho type trong action, vd: 'user/login'
  name: "adminUser",
  // khởi tạo state là một đối tượng
  initialState: {
    isLogged: false,
    current: null,
    token: null,
  },
  // định nghĩa các function sẽ làm việc với state
  // ứng với mỗi action, sẽ cho ra một state duy nhất
  reducers: {
    login: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.current = action.payload.current;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLogged = false;
      state.token = null;
      state.current = null;
    },
  },
});

// dispatch sẽ nhận vào một reducer và một action để thay đổi state
// xuất ra để truyền vào dispatch
export const { login, logout } = slice.actions;

// xuất ra để truyền váo store
export default slice.reducer;
