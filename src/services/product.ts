/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../api/baseApi/axiosInstance"

export const getProduct = async (search?: string) => {
  try {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await axiosInstance.get(`/products${query}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getProductDetails = async (id: string) => {
  try {
     if (!id) throw new Error("Product ID is required!");
    const response = await axiosInstance.get(`/products/${id}`);
    // console.log(response.data.data)
    return response.data; 
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
