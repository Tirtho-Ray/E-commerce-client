import { axiosInstance } from "../api/baseApi/axiosInstance"

 export const getProduct  = async () =>{
    try {
        const response  = await axiosInstance.get("/product");
        return response.data
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
       throw error.response?.data ||error
    }
}