import { useContext } from "react";
import { CartProductsContext } from "../context/CartProductsContext";

export const useCartProducts = () => {
  const context = useContext(CartProductsContext);

  if (!context) {
    throw new Error(
      "useCartProducts should be used inside CartProductsProvider"
    );
  }

  return context;
};
