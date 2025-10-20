import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../../services/product"

export const useProduct = () =>{
    return useQuery({
        queryKey:["product"],
        queryFn:() =>getProduct()
    })
}