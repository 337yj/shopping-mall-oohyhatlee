import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/Common/ProductCard";
import styles from "./allProducts.module.scss";

const AllProducts = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <section className={styles.wrapper}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2 className={styles.subHeader}>Shop the Collection</h2>

      <ul className={styles.productsWrap}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </section>
  );
};

export default AllProducts;
