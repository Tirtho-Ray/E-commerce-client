/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


export interface TCartProduct {
  dateAdded?: any;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number; 
  discount?: number;
  brand?: string;
  discountType:any,
  TCartProduct?:any
}

const STORAGE_KEY = "addToLocalCart";

export const useLocalCart = () => {
  const [cart, setCart] = useState<TCartProduct[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

const addToCartLocal = (product: TCartProduct, quantity = 1) => {
    setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev;
        }

        const now = new Date().toISOString();
        return [...prev, { ...product, quantity, dateAdded: now }];
    });

    // Trigger toast after setCart
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (isAlreadyInCart) {
        toast.error("Product is already in the cart!");
    } else {
        toast.success("Product added to cart!");
    }
};



  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Check if product is in cart
  const isInCart = (productId: string) =>
    cart.some(item => item.id === productId);

  // Get total items count
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Clear cart
  const clearCart = () => setCart([]);

  return {
    cart,
    addToCartLocal,
    removeFromCart,
    updateQuantity,
    isInCart,
    totalItems,
    clearCart,
  };
};
