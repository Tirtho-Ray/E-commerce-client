import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, UpdateMe } from "../../services/profile"

export const useGetMe = () =>{
    return useQuery({
        queryKey:["profile"],
        queryFn:()=>getMe(),
        staleTime: 30 * 1000,   
        gcTime: 5 * 60 * 1000,  
        refetchOnMount: false,    
        refetchOnWindowFocus: true, 
        refetchInterval: 10000,   
    })
};



export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
