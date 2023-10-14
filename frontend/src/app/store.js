import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import adminUser from "./adminUser";
import userReducer from "./user";

// cấu hình chung cho redux-persist
const generalPersistConfig = {
  key: "root",
  storage,
};

// cấu hình riêng cho user nếu có custom khác với generalPersistConfig
const userPersistConfig = {
  key: "user",
  storage: storage,
  // backlist là danh sách thuộc tính trong payloadd không được persist
  // blacklist: ["current"],
  // whitelist là danh sách thuộc tính được persist
};
const adminUserPersistConfig = {
  key: "adminUser",
  storage: storage,
  // backlist là danh sách thuộc tính trong payloadd không được persist
  // blacklist: ["current"],
  // whitelist là danh sách thuộc tính được persist
};

// configStore cũng chính là hàm tạo store, theo đó chỉ cần export store và truyền main.jsx để bọc <App /> trong <Provider />
// mỗi ứng dụng chỉ có một store
// slide là tập hợp nhiều reducer
// các slide sẽ được truyền vào object reducer bên dưới
export const store = configureStore({
  reducer: {
    // dùng key object này để gọi đến state khi dùng useSelector
    // dùng persist
    user: persistReducer(userPersistConfig, userReducer),
    adminUser: persistReducer(adminUserPersistConfig, adminUser),
  },
  // redux toolkit đã tự động thêm vào redux thunk, không cần cài lại
  // khi dùng redux-persist phải gọi thêm thunk, tránh lỗi non-serializable
  middleware: [thunk],
});

// persistStore nhận vào store và trả về persitor, export và truyền vào main.jsx để bọc <App /> trong <PersistGate />
export const persistor = persistStore(store);
