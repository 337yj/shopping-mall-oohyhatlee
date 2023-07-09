import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/Common/ProductCard";
import styles from "./allProducts.module.scss";

const AllProducts = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.subHeader}>Shop the Collection</h2>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className={styles.categories}>
        <li
          className={selectedCategory === null ? styles.selected : ""}
          onClick={() => handleCategorySelect(null)}
        >
          All
        </li>
        <li
          className={selectedCategory === "Bottom" ? styles.selected : ""}
          onClick={() => handleCategorySelect("Bottom")}
        >
          Bottom
        </li>
        <li
          className={selectedCategory === "Top" ? styles.selected : ""}
          onClick={() => handleCategorySelect("Top")}
        >
          Top
        </li>
        <li
          className={selectedCategory === "Dress" ? styles.selected : ""}
          onClick={() => handleCategorySelect("Dress")}
        >
          Dress
        </li>
        <li
          className={selectedCategory === "Outer" ? styles.selected : ""}
          onClick={() => handleCategorySelect("Outer")}
        >
          Outer
        </li>
        <li
          className={selectedCategory === "Etc" ? styles.selected : ""}
          onClick={() => handleCategorySelect("Etc")}
        >
          Etc
        </li>
      </ul>

      <ul className={styles.productsWrap}>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </section>
  );
};

export default AllProducts;
