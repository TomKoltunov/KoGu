import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FilteredProductsContextType } from "../types/filteredProductsContextType";
import type { Product } from "../types/productType";

export const FilteredProductsContext =
  createContext<FilteredProductsContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FilteredProductsProvider = ({ children }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const filterProductsByCategory = useCallback((category: string): void => {
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter((product) => product.category === category)
    );
  }, []);

  const filterProductsByPrice = useCallback(
    (price: number, priceFilterBy: "min" | "max"): void => {
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((product) =>
          priceFilterBy === "min"
            ? product.price >= price
            : product.price <= price
        )
      );
    },
    []
  );

  const filterProductsByUploadingDate = useCallback(
    (uploadingDate: string): void => {
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((product) => {
          new Date(product.uploadingDate) >= new Date(uploadingDate);
        })
      );
    },
    []
  );

  const contextValue: FilteredProductsContextType = useMemo(
    () => ({
      filteredProducts,
      setFilteredProducts,
      filterProductsByCategory,
      filterProductsByPrice,
      filterProductsByUploadingDate,
    }),
    []
  );

  return (
    <FilteredProductsContext.Provider value={contextValue}>
      {children}
    </FilteredProductsContext.Provider>
  );
};
