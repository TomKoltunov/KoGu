import { useCartProducts } from "../../../../hooks/useCartProducts";
import type { Product } from "../../../../types/productType";
import styles from "./styles.module.css";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartProducts();

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.meta}>
          <span className={styles.badge}>{product.category}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.date}>{product.uploadingDate}</span>
        </div>
      </div>

      <div className={styles.description}>{product.description}</div>

      <div className={styles.infoRow}>
        <div className={styles.info}>
          <div className={styles.infoLabel}>Seller</div>
          <div className={styles.infoValue}>{product.seller}</div>
        </div>

        <div className={styles.price}>
          <div className={styles.priceLabel}>Price</div>
          <div className={styles.priceValue}>${product.price}</div>
        </div>
      </div>

      <button
        className={styles.button}
        type="button"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </article>
  );
};
