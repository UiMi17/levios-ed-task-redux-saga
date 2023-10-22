import { useEffect, useState } from "react";
import { fetchProducts } from "../services/mockAPI";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);
  return products;
};

export default useProducts;
