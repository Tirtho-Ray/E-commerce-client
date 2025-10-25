import { useMutation } from "@tanstack/react-query";
import { createCart } from './../../services/cart';

export const useCreateCart = () => {
  return useMutation({
    mutationFn:createCart,
  });
};

