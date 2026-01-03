import { useContext } from "react";
import { FiltersStateContext } from "../context/FiltersStateContext";

export const useFiltersState = () => {
  const context = useContext(FiltersStateContext);

  if (!context) {
    throw new Error(
      "useFilteredProducts must be used inside FilteredProductsProvider"
    );
  }

  return context;
};
