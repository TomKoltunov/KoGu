import { createContext, useMemo, type ReactNode } from "react";
import type { CartProductsContextValue } from "../types/cartProductsContextValue";
import { useCartProductsState } from "../hooks/useCartProductsState";

export const CartProductsContext =
  createContext<CartProductsContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProductsProvider = ({ children }: Props) => {
  const {
    cartProducts,
    setCartProducts,
    addToCart,
    removeSingleInstanceFromCart,
    removeAllInstancesFromCart,
    resetCart,
    getSingleCartProductPrice,
    getEntireCartProductsQuantity,
    getEntireCartProductsPrice,
  } = useCartProductsState();

  const contextValue: CartProductsContextValue = useMemo(
    () => ({
      cartProducts,
      setCartProducts,
      addToCart,
      removeSingleInstanceFromCart,
      removeAllInstancesFromCart,
      resetCart,
      getSingleCartProductPrice,
      getEntireCartProductsQuantity,
      getEntireCartProductsPrice,
    }),
    [cartProducts]
  );

  return (
    <CartProductsContext.Provider value={contextValue}>
      {children}
    </CartProductsContext.Provider>
  );
};
