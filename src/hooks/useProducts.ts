import { useEffect, useState } from "react";
import * as data from "../data/products.json";
import type { Product } from "../types/productType";

type Props = {
  delay: number;
};

export const useProducts = ({ delay = 500 }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const result = setTimeout(() => {
      setProducts(data.products as Product[]);
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(result);
  }, []);

  return { products, isLoading };
};
