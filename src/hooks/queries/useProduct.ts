import { useQuery } from "@tanstack/react-query"
import { getProduct, getProductDetails } from "../../services/product"
import { axiosInstance } from "../../api/baseApi/axiosInstance";

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





export const useProductsByIds = (ids: string[]) => {
  return useQuery({
    queryKey: ["products", { ids }],
    enabled: ids.length > 0,
    staleTime: 60_000, // 1 min
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axiosInstance.get(`/products`, {
        params: { ids: ids.join(",") },
      });

      // 🧠 Normalize response (no matter how backend returns it)
      const data = res.data?.data || res.data?.products || res.data || [];
      return Array.isArray(data) ? data : [];
    },
  });
};
