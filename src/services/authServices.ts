/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../api/baseApi/axiosInstance"
import type { TLogin } from "../types/auth/login";
import type { TRegister } from "../types/auth/register";

export const registerUser = async(formData:TRegister)=>{
    const response  = await axiosInstance.post("/auth/register",formData);
    return response.data;
};
export const loginUser = async(fromData:TLogin)=>{
  try {
    const response  = await axiosInstance.post("/auth/login",fromData);
    return response.data;
    
  } catch (error:any) {
    throw error.response?.data ||error
    
  }
};

export const veryFiOtp = async (data: { otp: string; userId: string }) => {
  const response = await axiosInstance.post("/auth/verify-otp", data);
  return response.data;
};
