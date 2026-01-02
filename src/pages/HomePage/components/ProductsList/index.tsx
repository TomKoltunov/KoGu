import type { Product } from "../../../../types/productType";
import { ProductCard } from "../ProductCard";
import styles from "./styles.module.css";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
