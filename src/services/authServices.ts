import { axiosInstance } from "../api/baseApi/axiosInstance"

export const loginUser = async()=>{
    const user  = await axiosInstance.post("/auth/login");
    return user;
};