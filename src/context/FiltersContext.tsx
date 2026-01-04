import { createContext, useMemo, useState, type ReactNode } from "react";
import type { FiltersContextValue } from "../types/filtersContextValue";

export const FiltersContext = createContext<FiltersContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const FiltersProvider = ({ children }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [uploadingDate, setUploadingDate] = useState<string>("");

  const contextValue: FiltersContextValue = useMemo(
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
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};
