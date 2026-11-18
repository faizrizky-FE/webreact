import axios from "axios";

const API_URL = {
  smartphone: import.meta.env.VITE_API_SMARTPHONE,
  laptop: import.meta.env.VITE_API_LAPTOP,
  tablet: import.meta.env.VITE_API_TABLET,
  aksesoris: import.meta.env.VITE_API_AKSESORIS,
};

export const getProduk = (kategori) => {
  return axios.get(API_URL[kategori]);
};

export const tambahProduk = (data) => {
  return axios.post("https://dummyjson.com/products/add", data);
};

export const editProduk = (id, data) => {
  return axios.put(`https://dummyjson.com/products/${id}`, data);
};

export const hapusProduk = (id) => {
  return axios.delete(`https://dummyjson.com/products/${id}`);
};
