import { useQuery } from "@tanstack/react-query"
import { getProduct, getProductDetails } from "../../services/product"

export const useProduct = (search?: string) => {
  return useQuery({
    queryKey: ["product", search],
    queryFn: () => getProduct(search),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: search !== undefined,
  });
};

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id, 
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
