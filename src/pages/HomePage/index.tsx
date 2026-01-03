import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useFiltersState } from "../../hooks/useFiltersState";
import { FiltersDropdown } from "./components/FiltersDropdown";
import { ProductList } from "./components/ProductsList";
import type { Product } from "../../types/productType";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./styles.module.css";

export const filterByUploadingDate = (
  selectedUploadingDate: string,
  uploadingDate: string
): boolean => {
  const productDateObject = new Date(selectedUploadingDate);
  const filteredDateObject = new Date(uploadingDate);
  return productDateObject.getTime() < filteredDateObject.getTime();
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
  } = useFiltersState();

  const debouncedValue = useDebounce(searchValue, 700);

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
    debouncedValue,
    selectedCategories,
    minPrice,
    maxPrice,
    uploadingDate,
  ]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Shop KoGu</h1>
          <p className={styles.subtitle}>
            Search products, filter by category/price/date, and add items to
            your cart.
          </p>
        </div>

        <div className={styles.searchWrap}>
          <input
            className={styles.search}
            type="text"
            placeholder="Bonsai tree…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className={styles.searchHint}>
            {debouncedValue
              ? `Searching: “${debouncedValue}”`
              : "Tip: try a product name or a description"}
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className={styles.loadingCard}>
          <div className={styles.spinner} aria-hidden="true" />
          <div className={styles.loadingText}>Loading products…</div>
        </div>
      ) : (
        <div className={styles.content}>
          <aside className={styles.filters}>
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
          </aside>

          <main className={styles.list}>
            <ProductList products={filteredProducts} />
            {filteredProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyTitle}>No results</div>
                <div className={styles.emptySub}>
                  Try clearing some filters or searching for something else.
                </div>
              </div>
            ) : null}
          </main>
        </div>
      )}
    </div>
  );
};
