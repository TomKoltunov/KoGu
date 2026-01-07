import { useProducts } from "../../hooks/useProducts";
import { FiltersDropdown } from "./components/FiltersDropdown";
import { ProductList } from "./components/ProductsList";
import styles from "./styles.module.css";
import { useFilters } from "../../hooks/useFilters";

export const HomePage = () => {
  const { isLoading } = useProducts({ delay: 500 });

  const {
    searchValue,
    setSearchValue,
    debouncedValue,
    filteredProducts,
    uniqueCategories,
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    uploadingDate,
    setUploadingDate,
  } = useFilters();

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
