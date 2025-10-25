/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { axiosInstance } from "../api/baseApi/axiosInstance"

export type TCart = {
  userId: string;
  productId: string;
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
  };
};

export const createCart  =async( payload:TCart) =>{
    try {
        const response  =await axiosInstance.post("/my-cart/add",payload);
        return response.data
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    throw error.response?.data ?? { message: "Something went wrong" };
  }
  throw { message: "Unexpected error occurred" };
}
    
}


export const getCart  =async( ) =>{
    try {
        const response  =await axiosInstance.get("/my-cart");
        return response.data
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
       throw error.response?.data ||error
    }
    
}