import { useFilters } from "../../../hooks/useFilters";
import { ProductCard } from "../../HomePage/components/ProductsList/ProductCard";

export const RecommendedSection = () => {
  const { filteredProducts } = useFilters();
  const fiveProducts = filteredProducts.slice(0, 5);

  return (
    <div>
      {fiveProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
