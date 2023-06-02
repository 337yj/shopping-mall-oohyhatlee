import React from "react";
import ProductCard from "./ProductCard";
import styles from "./products.module.scss";
import useProducts from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

// useQuery를 이용해서 firebase에 있는 정보들을 가져오고 캐싱해줌
// key, 콜백함수 전달 , 인자=호출 ()=>getProducts() => 생략가능, 함수참조값만 전달
// console.log(products);
// console.log(`프로덕트: ${products}`);
const Products = () => {
  const navigate = useNavigate();
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };

  return (
    <article className={styles.wrapper}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={styles.shopHeader}>
        <h2>Shop All</h2>
      </div>

      <ul className={styles.productsWrap}>
        {products &&
          products
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </ul>
    </article>
  );
};

export default Products;
