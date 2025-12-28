import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { FiltersDropdown } from "./FiltersDropdown";
import { ProductList } from "./components/ProductsList";

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

  console.log(minPrice);

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
        onPriceChange={(minPrice: number, maxPrice: number) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
        }}
      />
      <ProductList products={products} />
    </div>
  );
};
