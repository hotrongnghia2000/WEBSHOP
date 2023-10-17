import axiosClient from "./axiosClient";

// mỗi file đại diện cho một đối tượng trong model schema
// tạo ra  các hàm gọi api theo yêu cầu được chỉ định
const userApi = {
  register(body) {
    const url = "user/register";
    // withCredentials: true cho phép server có thể truy cập vào cookie => req.cookies
    return axiosClient.post(url, body, { withCredentials: true });
  },
  changePassword(body) {
    const url = "user/changePassword";
    // withCredentials: true cho phép server có thể truy cập vào cookie => req.cookies
    return axiosClient.post(url, body, { withCredentials: true });
  },
  login(body) {
    const url = "user/login";
    return axiosClient.post(url, body, { withCredentials: true });
  },
  finishRegistration(body) {
    const url = "user/finishRegistration";
    return axiosClient.post(url, body, { withCredentials: true });
  },
  finishChangePassword(body) {
    const url = "user/finishChangePassword";
    return axiosClient.post(url, body, { withCredentials: true });
  },
  updateCart(body) {
    const url = `user/updateCart`;
    return axiosClient.patch(url, body);
  },
  delCart(body) {
    const url = `user/delCart`;
    return axiosClient.patch(url, body);
  },
  getCurrent() {
    const url = `user/getCurrent`;
    return axiosClient.get(url);
  },
  refreshToken() {
    const url = `user/refreshToken`;
    return axiosClient.get(url, { withCredentials: true });
  },
};

export default userApi;
