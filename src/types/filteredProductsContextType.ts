import type { Product } from "./productType";

export type FilteredProductsContextType = {
  filteredProducts: Product[];
  setFilteredProducts: (filteredProducts: Product[]) => void;
  filterProductsByCategory: (category: string) => void;
  filterProductsByPrice: (price: number, priceFilterBy: "min" | "max") => void;
  filterProductsByUploadingDate: (uploadingDate: string) => void;
};
