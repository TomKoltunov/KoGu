import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

export const useFiltersState = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error(
      "useFilteredProducts must be used inside FilteredProductsProvider"
    );
  }

  return context;
};
