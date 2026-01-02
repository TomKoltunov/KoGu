import { createContext, useMemo, useState, type ReactNode } from "react";
import type { FiltersStateContextType } from "../types/filteredProductsContextType";

export const FiltersStateContext =
  createContext<FiltersStateContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FiltersStateProvider = ({ children }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [uploadingDate, setUploadingDate] = useState<string>("");

  const contextValue: FiltersStateContextType = useMemo(
    () => ({
      selectedCategories,
      setSelectedCategories,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      uploadingDate,
      setUploadingDate,
    }),
    [selectedCategories, minPrice, maxPrice, uploadingDate]
  );

  return (
    <FiltersStateContext.Provider value={contextValue}>
      {children}
    </FiltersStateContext.Provider>
  );
};
