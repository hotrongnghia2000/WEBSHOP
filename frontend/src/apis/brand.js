import axiosClient from "./axiosClient";

const brandApi = {
  getAll(params) {
    const url = "brand/getAll";
    return axiosClient.get(url, { params });
  },
  add(body) {
    const url = "brand/add";
    return axiosClient.post(url, body);
  },
  delete(id) {
    const url = `brand/delete/${id}`;
    return axiosClient.delete(url);
  },
  deleteChecks(params) {
    const url = `brand/deleteChecks`;
    return axiosClient.delete(url, { params });
  },
};

export default brandApi;
