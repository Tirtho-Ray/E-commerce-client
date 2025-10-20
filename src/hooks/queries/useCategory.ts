import { useQuery } from "@tanstack/react-query"
import { getCategory } from "../../services/category"

export const useGetCategory = () =>{
    return useQuery({
        queryKey:["category"],
        queryFn:()=>getCategory(),
         staleTime: 30 * 1000,   
        gcTime: 5 * 60 * 1000,  
        refetchOnMount: false,    
        refetchOnWindowFocus: true, 
        refetchInterval: 10000,   
    })
}
