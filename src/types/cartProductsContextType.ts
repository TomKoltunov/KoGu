import type { Dispatch, SetStateAction } from "react";
import type { Product } from "./productType";

export type CartProductsContextType = {
  cartProducts: Product[];
  setCartProducts: Dispatch<SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  removeSingleInstanceFromCart: (product: Product) => void;
  removeAllInstancesFromCart: (product: Product) => void;
  resetCart: () => void;
  getSingleCartProductPrice: (product: Product) => number;
  getEntireCartProductsQuantity: () => number;
  getEntireCartProductsPrice: () => number;
};
