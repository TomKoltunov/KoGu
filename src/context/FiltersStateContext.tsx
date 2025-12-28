import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  FiltersState,
  FiltersStateContextType,
} from "../types/filteredProductsContextType";
import type { Product } from "../types/productType";

export const FiltersStateContext =
  createContext<FiltersStateContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const todayDateInStringFormat = (): string => {
  const todayDate = new Date();
  const todayDateDay = String(todayDate.getDay()).padStart(2, "0");
  const todayDateMonth = String(todayDate.getMonth() + 1).padStart(2, "0");
  const todayDateYear = todayDate.getFullYear();
  const result = `${todayDateYear}-${todayDateMonth}-${todayDateDay}`;
  return result;
};

export const FiltersStateProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [uploadingDate, setUploadingDate] = useState<string>(
    todayDateInStringFormat()
  );

  const contextValue: FiltersStateContextType = useMemo(
    () => ({
      categories,
      setCategories,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      uploadingDate,
      setUploadingDate,
    }),
    []
  );

  return (
    <FiltersStateContext.Provider value={contextValue}>
      {children}
    </FiltersStateContext.Provider>
  );
};
