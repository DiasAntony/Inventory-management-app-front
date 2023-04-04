import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND;

// create New product

export const createNewProduct = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/products`, formData);
  return response.data;
};

// get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/products`);
  return response.data;
};

// delete product

export const deleteProduct = async (productId) => {
  const response = await axios.delete(
    `${BACKEND_URL}/api/products/${productId}`
  );
  return response.data;
};

// get a product
export const getProduct = async (productId) => {
  const response = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
  return response.data;
};

// update product
// product id and which item you want (changed by client) to change
export const updateProduct = async (productId, formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/products/${productId}`,
    formData
  );
  return response.data;
};
