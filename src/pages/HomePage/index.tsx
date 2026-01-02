import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { FiltersDropdown } from "./FiltersDropdown";
import { ProductList } from "./components/ProductsList";
import type { Product } from "../../types/productType";

export const filterByUploadingDate = (
  selectedUploadingDate: string,
  uploadingDate: string
): boolean => {
  const productDateObject = new Date(selectedUploadingDate);
  const filteredDateObject = new Date(uploadingDate);
  return productDateObject.getTime() >= filteredDateObject.getTime();
};

export const HomePage = () => {
  const { products, isLoading } = useProducts({ delay: 500 });
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    uploadingDate,
    setUploadingDate,
  } = useFilteredProducts();

  const uniqueCategories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return [...new Set(allCategories)];
  }, [products]);

  const filteredProducts = useMemo((): Product[] => {
    return products
      .filter((product) => {
        return product.name.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
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
        return filterByUploadingDate(product.uploadingDate, uploadingDate);
      });
  }, [
    products,
    searchValue,
    selectedCategories,
    minPrice,
    maxPrice,
    uploadingDate,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Shop KoGu</h1>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FiltersDropdown
        uniqueCategories={uniqueCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        uploadingDate={uploadingDate}
        setUploadingDate={setUploadingDate}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};
