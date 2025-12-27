import { useContext } from "react";
import { FilteredProductsContext } from "../context/FilteredProductsContext";

export const useFilteredProducts = () => {
  const context = useContext(FilteredProductsContext);

  if (!context) {
    throw new Error(
      "useFilteredProducts must be used inside FilteredProductsProvider"
    );
  }

  return context;
};
