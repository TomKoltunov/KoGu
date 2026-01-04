import type { Product } from "./productType";

export type CartProductsContextValue = {
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  removeSingleInstanceFromCart: (product: Product) => void;
  removeAllInstancesFromCart: (product: Product) => void;
  resetCart: () => void;
  getSingleCartProductPrice: (product: Product) => number;
  getEntireCartProductsQuantity: () => number;
  getEntireCartProductsPrice: () => number;
};
