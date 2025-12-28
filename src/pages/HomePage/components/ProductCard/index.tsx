import { useCartProducts } from "../../../../hooks/useCartProducts";
import type { Product } from "../../../../types/productType";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartProducts();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Name: {product.name}</span>
      <span>Desciption: {product.description}</span>
      <span>Price: {product.price}</span>
      <span>Seller: {product.seller}</span>
      <span>Category: {product.category}</span>
      <span>Uploading Date: {product.uploadingDate}</span>
      <button type="button" onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
};
