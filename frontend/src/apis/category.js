import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params) {
    const url = "category/getAll";
    return axiosClient.get(url, { params });
  },
  getOne(id) {
    const url = `category/getOne/${id}`;
    return axiosClient.get(url);
  },
  add(body) {
    const url = "category/add";
    return axiosClient.post(url, body);
  },
  update(body, id) {
    const url = `category/update/${id}`;
    return axiosClient.patch(url, body);
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
