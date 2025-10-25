import { useMutation } from "@tanstack/react-query"
import { VendorReq } from "../../services/vendorServices"

export const useVendorReq = () =>{
    return useMutation({
        mutationFn:VendorReq,
    })
} 