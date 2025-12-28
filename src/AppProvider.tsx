import type { ReactNode } from "react";
import { CartProductsProvider } from "./context/CartProductsContext";
import { FiltersStateProvider } from "./context/FiltersStateContext";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <FiltersStateProvider>
      <CartProductsProvider>{children}</CartProductsProvider>
    </FiltersStateProvider>
  );
};
