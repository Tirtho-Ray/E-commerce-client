import { axiosInstance } from "../api/baseApi/axiosInstance"
import type { TVendor } from "../utils/validation/seller.validation";

export const VendorReq = async (fromData:TVendor) =>{
    try {
        const vendor  = await axiosInstance.post("/vendor/vendor-req",fromData);
        return vendor.data;
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        //  console.error("VendorReq Error:", error.response?.data || error);
          throw error.response?.data ||error
    }
}