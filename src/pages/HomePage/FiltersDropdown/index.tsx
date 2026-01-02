import type { Dispatch, SetStateAction } from "react";

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
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        maxWidth: "250px",
      }}
    >
      <div>Categories: </div>

      {uniqueCategories.map((category) => {
        const checked = selectedCategories.includes(category);
        const checkboxId = `${category}`;
        return (
          <label
            key={category}
            htmlFor={checkboxId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 2px",
              cursor: "pointer",
            }}
          >
            <input
              id={checkboxId}
              type="checkbox"
              checked={checked}
              onChange={() => toggleCategory(category)}
            />
            <span>{category}</span>
          </label>
        );
      })}

      <label htmlFor="minPrice-select">Min Price:</label>
      <input
        id="minPrice-select"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        style={{ padding: "4px" }}
      />

      <label htmlFor="maxPrice-select">Max Price:</label>
      <input
        id="maxPrice-select"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        style={{ padding: "4px" }}
      />

      <label htmlFor="uploadingDate-select">Uploading Date:</label>
      <input
        id="uploadingDate-select"
        type="date"
        value={uploadingDate}
        onChange={(e) => setUploadingDate(e.target.value)}
        style={{ padding: "4px" }}
      />
    </div>
  );
};
