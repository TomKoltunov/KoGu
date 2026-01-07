import type { Dispatch, SetStateAction } from "react";
import type { Product } from "./productType";

export type FiltersContextValue = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  debouncedValue: string;
  filteredProducts: Product[];
  uniqueCategories: string[];
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  uploadingDate: string;
  setUploadingDate: (uploadingDate: string) => void;
};
