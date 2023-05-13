import React from "react";
import ProductCard from "./ProductCard";
import styles from "./products.module.scss";
import useProducts from "../../../hooks/useProducts";

// useQuery를 이용해서 firebase에 있는 정보들을 가져오고 캐싱해줌
// key, 콜백함수 전달 , 인자=호출 ()=>getProducts() => 생략가능, 함수참조값만 전달
// console.log(products);
// console.log(`프로덕트: ${products}`);
const Products = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.productsWrap}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
};

export default Products;
