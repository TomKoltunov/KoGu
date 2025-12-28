import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { FiltersDropdown } from "./FiltersDropdown";
import { ProductList } from "./components/ProductsList";
import type { Product } from "../../types/productType";

export const stringToDateConverter = (stringFormatDate: string): Date => {
  const extractedYear = Number(stringFormatDate.substring(0, 4));
  const extractedMonth = Number(stringFormatDate.substring(5, 7));
  const extractedDay = Number(stringFormatDate.substring(8, 10));
  const result = new Date(extractedYear, extractedMonth, extractedDay);
  return result;
};

export const HomePage = () => {
  const { products, isLoading } = useProducts({ delay: 500 });
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    setCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    uploadingDate,
    setUploadingDate,
  } = useFilteredProducts();

  const uniqueCategories = useMemo(() => {
    const categories = products.map((product) => product.category);
    return [...new Set(categories)];
  }, [products]);

  const filteredProducts = useMemo((): Product[] => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
          ? product
          : ""
      )
      .filter((product) =>
        uniqueCategories.includes(product.category) ? "" : product
      )
      .filter((product) =>
        product.price >= minPrice && product.price <= maxPrice ? product : ""
      )
      .filter((product) =>
        stringToDateConverter(product.uploadingDate) <=
        stringToDateConverter(uploadingDate)
          ? ""
          : product
      );
  }, [
    products,
    searchValue,
    uniqueCategories,
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
        setCategories={setCategories}
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
