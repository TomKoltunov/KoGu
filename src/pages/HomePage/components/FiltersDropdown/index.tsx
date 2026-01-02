import type { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

type Props = {
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

export const FiltersDropdown = ({
  uniqueCategories,
  selectedCategories,
  setSelectedCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  uploadingDate,
  setUploadingDate,
}: Props) => {
  const toggleCategory = (category: string): void => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(
            (selectedCategory) => selectedCategory !== category
          )
        : [...prevSelectedCategories, category]
    );
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardTitle}>Filters</div>

      <div className={styles.group}>
        <div className={styles.label}>Categories</div>

        <div className={styles.checkboxList}>
          {uniqueCategories.map((category) => {
            const checked = selectedCategories.includes(category);
            const checkboxId = `${category}`;
            return (
              <label
                key={category}
                htmlFor={checkboxId}
                className={styles.checkboxRow}
              >
                <input
                  id={checkboxId}
                  className={styles.checkbox}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category)}
                />
                <span className={styles.checkboxText}>{category}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="minPrice-select">
          Min price
        </label>
        <input
          id="minPrice-select"
          className={styles.input}
          type="number"
          value={minPrice === 0 ? "" : minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="0"
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="maxPrice-select">
          Max price
        </label>
        <input
          id="maxPrice-select"
          className={styles.input}
          type="number"
          value={maxPrice === 100 ? "" : maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="100"
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="uploadingDate-select">
          Uploaded after
        </label>
        <input
          id="uploadingDate-select"
          className={styles.input}
          type="date"
          value={uploadingDate}
          onChange={(e) => setUploadingDate(e.target.value)}
        />
        <div className={styles.hint}>Leave empty to include all dates.</div>
      </div>
    </section>
  );
};
