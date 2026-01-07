import { createContext, useMemo, useState, type ReactNode } from "react";
import type { FiltersContextValue } from "../types/filtersContextValue";
import type { Product } from "../types/productType";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";

export const FiltersContext = createContext<FiltersContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const filterByUploadingDate = (
  selectedUploadingDate: string,
  uploadingDate: string
): boolean => {
  const productDateObject = new Date(selectedUploadingDate);
  const filteredDateObject = new Date(uploadingDate);
  return productDateObject.getTime() < filteredDateObject.getTime();
};

export const FiltersProvider = ({ children }: Props) => {
  const { products } = useProducts({ delay: 500 });
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 700);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [uploadingDate, setUploadingDate] = useState<string>("");

  const uniqueCategories = useMemo((): string[] => {
    const allCategories = products.map((product) => product.category);
    return [...new Set(allCategories)];
  }, [products]);

  const filteredProducts = useMemo((): Product[] => {
    return products
      .filter((product) => {
        return product.name.toLowerCase().includes(debouncedValue) ||
          product.description.toLowerCase().includes(debouncedValue)
          ? product
          : "";
      })
      .filter((product) => {
        if (selectedCategories.length === 0) return true;
        return selectedCategories.includes(product.category);
      })
      .filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice
          ? product
          : "";
      })
      .filter((product) => {
        return !filterByUploadingDate(product.uploadingDate, uploadingDate);
      });
  }, [
    products,
    uniqueCategories,
    debouncedValue,
    selectedCategories,
    minPrice,
    maxPrice,
    uploadingDate,
  ]);

  console.log(`products: `, products);
  console.log(`filteredProducts: `, filteredProducts);

  const contextValue: FiltersContextValue = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      debouncedValue,
      filteredProducts,
      uniqueCategories,
      selectedCategories,
      setSelectedCategories,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      uploadingDate,
      setUploadingDate,
    }),
    [
      filteredProducts,
      uniqueCategories,
      debouncedValue,
      selectedCategories,
      minPrice,
      maxPrice,
      uploadingDate,
    ]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};
