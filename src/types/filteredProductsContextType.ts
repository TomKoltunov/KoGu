import type { Product } from "./productType";

// export type FilteredProductsContextType = {
//   filteredProducts: Product[];
//   setFilteredProducts: (filteredProducts: Product[]) => void;
//   filterProductsByCategory: (category: string) => void;
//   filterProductsByPrice: (price: number, priceFilterBy: "min" | "max") => void;
//   filterProductsByUploadingDate: (uploadingDate: string) => void;
// };

export type FiltersState = {
  filtersCategories: string[];
  filtersMinPrice: number;
  filtersMaxPrice: number;
  filtersUploadingDate: string;
};

export type FiltersStateContextType = {
  categories: string[];
  setCategories: (categories: string[]) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  uploadingDate: string;
  setUploadingDate: (uploadingDate: string) => void;
};
