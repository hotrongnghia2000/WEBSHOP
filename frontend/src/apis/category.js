import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params) {
    const url = "category/getAll";
    return axiosClient.get(url, { params });
  },
  add(body) {
    const url = "category/add";
    return axiosClient.post(url, body);
  },
  delete(id) {
    const url = `category/delete/${id}`;
    return axiosClient.delete(url);
  },
  deleteChecks(params) {
    const url = `category/deleteChecks`;
    return axiosClient.delete(url, { params });
  },
};

export default categoryApi;
