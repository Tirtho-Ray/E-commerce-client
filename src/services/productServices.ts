import { axiosInstance } from "../api/baseApi/axiosInstance";

export const getAllProducts = async () =>{
    const product = await axiosInstance.get('/product');
    return product
}