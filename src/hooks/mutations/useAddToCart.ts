/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { createCart } from "../../services/cart";
import toast from "react-hot-toast";
import type { TCart } from "../../services/cart";
import { useLocalCart } from "../../utils/cart/localCart";


export const useAddToCart = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCartLocal } = useLocalCart();

    const mutation = useMutation({
        mutationFn: (payload: TCart) => createCart(payload),
        onError: (err: any) => {
            if (err?.message === "Unauthorized" || err?.status === 401) {
                navigate("/login");
            } else {
                console.error("Add to cart failed:", err);
                toast.error(err.message);
            }
        },
        onSuccess: (data) => {
            console.log("Cart updated:", data);
            toast.success(data.message);
        },
    });

    const addToCart = (
        productId: string,
        quantity = 1,
        productData?: any,
        selectedVariant?: { color?: string; size?: string }
    ) => {
        if (user) {
            // server call
            mutation.mutate({
                userId: user._id,
                productId,
                quantity,
                selectedVariant,
            });
        } else {
            // save locally
            if (!productData) return;
            addToCartLocal({ ...productData, id: productId }, quantity);
            // toast.success("Added to cart . Please login at checkout.");
        }
    };

    return { addToCart, ...mutation };
};
