import axios from "axios";

// tự tạo ra một instance của axios client
// mỗi khi cần gọi api, ta sẽ gọi đến hàm axiosClient
// vì vậy, ta cần export default
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor giống một middleware xử lý trung gian trước request được gửi hoặc response được trả về
// LƯU Ý: err phải được đặt trong một promise thì cacth mới bắt được

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something wiith response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  },
);

export default axiosClient;
