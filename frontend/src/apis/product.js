import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = "product/getAll";
    return axiosClient.get(url, { params });
  },
  add(body) {
    const url = "product/add";
    return axiosClient.post(url, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  delete(id) {
    const url = `product/delete/${id}`;
    return axiosClient.delete(url);
  },
  deleteChecks(params) {
    const url = `product/deleteChecks`;
    return axiosClient.delete(url, { params });
  },
};

export default productApi;
