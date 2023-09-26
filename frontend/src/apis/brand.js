import axiosClient from "./axiosClient";

const brandApi = {
  getAll(params) {
    const url = "brand/getAll";
    return axiosClient.get(url, { params });
  },
  getOne(id) {
    const url = `brand/getOne/${id}`;
    return axiosClient.get(url);
  },
  add(body) {
    const url = "brand/add";
    return axiosClient.post(url, body);
  },
  update(body, id) {
    const url = `brand/update/${id}`;
    return axiosClient.patch(url, body);
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
