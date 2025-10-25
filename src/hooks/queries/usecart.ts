import { useQuery } from "@tanstack/react-query"
import { getCart } from "../../services/cart"


export const useGetCart = () =>{
    return useQuery({
        queryKey:["cart"],
        queryFn:()=>getCart(),
         staleTime: 30 * 1000,   
        gcTime: 5 * 60 * 1000,  
        refetchOnMount: false,    
        refetchOnWindowFocus: true, 
        refetchInterval: 10000,   
    })
}
