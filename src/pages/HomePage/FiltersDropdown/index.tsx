type Props = {
  uniqueCategories: string[];
  setCategories: (categories: string[]) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  uploadingDate: string;
  setUploadingDate: (uploadingDate: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
};

export const FiltersDropdown = ({
  uniqueCategories,
  setCategories,
  minPrice,
  maxPrice,
  uploadingDate,
  setUploadingDate,
  onPriceChange,
}: Props) => {
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
      <label htmlFor="categories-select">Categories:</label>
      <select
        id="categories-select"
        value={uniqueCategories}
        onChange={(e) => setCategories([e.target.value])}
        multiple
        style={{ padding: "4px" }}
      >
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="minPrice-select">Min Price:</label>
      <input
        id="minPrice-select"
        type="number"
        value={minPrice}
        onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
        style={{ padding: "4px" }}
      />

      <label htmlFor="maxPrice-select">Max Price:</label>
      <input
        id="maxPrice-select"
        type="number"
        value={maxPrice}
        onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
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
