import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/Common/ProductCard";
import styles from "./allProducts.module.scss";

const AllProducts = () => {
  const {
    productsQuery: { isLoading, data: products },
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = products
    ? selectedCategory
      ? products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.title.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : products.filter((product) =>
          product.title.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
    : [];

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.subHeader}>Shop the Collection</h2>
      {isLoading && <p className={styles.loading}>Loading...</p>}

      <div className={styles.categoriesWrap}>
        <ul className={styles.categories}>
          <li
            className={!selectedCategory ? styles.selected : ""}
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
        <input
          type="text"
          value={searchKeyword}
          onChange={onSearch}
          placeholder="Search products"
        />
      </div>
      <ul className={styles.productsWrap}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </section>
  );
};

export default AllProducts;
