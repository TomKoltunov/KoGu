import type { Product } from "../../../../types/productType";
import { ProductCard } from "../ProductCard";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
