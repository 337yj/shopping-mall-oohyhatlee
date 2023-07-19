import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";
import { Product } from "../types/common";

const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }: { product: Product; url: string }) =>
      addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    },
  );

  return { productsQuery, addProduct };
};

export default useProducts;
