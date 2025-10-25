import { useEffect } from "react";
import { useAuth } from "../useAuth";
import { useLocalCart } from "../../utils/cart/localCart";
import { useAddToCart } from "./useAddToCart";

export const useSyncCartOnLogin = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useLocalCart();
  const { addToCart } = useAddToCart();

  useEffect(() => {
    if (user && cart.length > 0) {
      // Sync local cart to server
      cart.forEach(item => {
        const { id, quantity, ...rest } = item;
        addToCart(id, quantity, rest); // server call
      });

      // Clear local cart after syncing
      clearCart();
    }
  }, [user]);
};
