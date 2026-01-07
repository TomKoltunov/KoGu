import { useCallback, useEffect, useState } from "react";
import type { Product } from "../types/productType";
import { storage } from "../utils/storage";

export const CART_KEY = "cart-key" as const;

export const useCartProductsState = () => {
  const [cartProducts, setCartProducts] =
    useState<Product[]>(storage.get(CART_KEY)) || [];

  useEffect(() => {
    storage.set(CART_KEY, cartProducts);
  }, [cartProducts]);

  const addToCart = useCallback((product: Product): void => {
    setCartProducts((prevCartProducts) => {
      const index = prevCartProducts.findIndex(
        (cartProduct) => cartProduct.id === product.id
      );

      if (index !== -1) {
        return prevCartProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        );
      }

      return [...prevCartProducts, { ...product, quantity: 1 }];
    });
  }, []);

  const removeSingleInstanceFromCart = useCallback((product: Product): void => {
    setCartProducts((prevCartProducts) => {
      const index = prevCartProducts.findIndex(
        (cartProduct) => cartProduct.id === product.id
      );

      if (index !== -1) {
        return prevCartProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
            : cartProduct
        );
      } else {
        return [...prevCartProducts];
      }
    });
  }, []);

  const removeAllInstancesFromCart = useCallback((product: Product): void => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((cartProduct) => cartProduct.id !== product.id)
    );
  }, []);

  const resetCart = useCallback((): void => {
    setCartProducts([]);
  }, []);

  const getSingleCartProductPrice = useCallback((product: Product): number => {
    return product.price * product.quantity;
  }, []);

  const getEntireCartProductsQuantity = (): number => {
    return cartProducts.reduce(
      (sum, cartProduct) => sum + cartProduct.quantity,
      0
    );
  };

  const getEntireCartProductsPrice = (): number => {
    return cartProducts.reduce(
      (sum, cartProduct) => sum + getSingleCartProductPrice(cartProduct),
      0
    );
  };

  return {
    cartProducts,
    addToCart,
    removeSingleInstanceFromCart,
    removeAllInstancesFromCart,
    resetCart,
    getSingleCartProductPrice,
    getEntireCartProductsQuantity,
    getEntireCartProductsPrice,
  };
};
