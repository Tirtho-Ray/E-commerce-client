import { axiosInstance } from "../api/baseApi/axiosInstance"

export const getCategory  =async( ) =>{
    try {
        const response  =await axiosInstance.get("/category");
        return response.data
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
       throw error.response?.data ||error
    }
    
}