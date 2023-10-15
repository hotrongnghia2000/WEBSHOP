import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = "product/getAll";
    return axiosClient.get(url, { params });
  },
  getOne(id) {
    const url = `product/getOne/${id}`;
    return axiosClient.get(url);
  },
  add(body) {
    const url = "product/add";
    return axiosClient.post(url, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  update(body, id) {
    const url = `product/update/${id}`;
    return axiosClient.patch(url, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  delete(id, params) {
    const url = `product/delete/${id}`;
    return axiosClient.delete(url, { params });
  },
  deleteChecks(params) {
    const url = `product/deleteChecks`;
    return axiosClient.delete(url, { params });
  },
  filter(params) {
    const url = `product/filter`;
    return axiosClient.get(url, { params });
  },
  rate(body, id) {
    const url = `product/rate/${id}`;
    return axiosClient.patch(url, body);
  },
};

export default productApi;
