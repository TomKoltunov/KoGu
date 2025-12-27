import type { Product } from "./productType";

export type CartProductsContextType = {
  cartProducts: Product[];
  setCartProducts: (cartProducts: Product[]) => void;
  addToCart: (product: Product) => void;
  removeSingleInstanceFromCart: (product: Product) => void;
  removeAllInstancesFromCart: (product: Product) => void;
  resetCart: () => void;
};
