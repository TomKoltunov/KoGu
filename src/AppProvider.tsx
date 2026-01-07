import type { ReactNode } from "react";
import { CartProductsProvider } from "./context/CartProductsContext";
import { FiltersProvider } from "./context/FiltersContext";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <CartProductsProvider>
      <FiltersProvider>{children}</FiltersProvider>
    </CartProductsProvider>
    // <FiltersProvider>
    //   <CartProductsProvider>{children}</CartProductsProvider>
    // </FiltersProvider>
  );
};
