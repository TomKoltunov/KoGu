import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/productType";
import { storage } from "../utils/storage";
import type { CartProductsContextType } from "../types/cartProductsContextType";

const CART_KEY = "cart-key";

export const CartProductsContext =
  createContext<CartProductsContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProductsProvider = ({ children }: Props) => {
  const [cartProducts, setCartProducts] = useState<Product[]>(
    storage.get(CART_KEY) || []
  );

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

  useEffect(() => {
    storage.set(CART_KEY, cartProducts);
  }, [cartProducts]);

  const contextValue: CartProductsContextType = useMemo(
    () => ({
      cartProducts,
      setCartProducts,
      addToCart,
      removeSingleInstanceFromCart,
      removeAllInstancesFromCart,
      resetCart,
    }),
    [cartProducts]
  );

  return (
    <CartProductsContext.Provider value={contextValue}>
      {children}
    </CartProductsContext.Provider>
  );
};
