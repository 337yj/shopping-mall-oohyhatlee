import React from "react";
import { useNavigate } from "react-router-dom";
import Products from "../../components/Common/Products";
import ProductCard from "../../components/Common/Products/ProductCard";
import useProducts from "../../hooks/useProducts";
import styles from "./allProducts.module.scss";

const AllProducts = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <article className={styles.wrapper}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2 className={styles.shopHeader}>Shop the Collection</h2>

      <ul className={styles.productsWrap}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </article>
  );
};

export default AllProducts;
