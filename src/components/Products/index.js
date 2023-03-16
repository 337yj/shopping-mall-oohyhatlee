import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/firebase';
import ProductCard from './ProductCard';
import styles from './products.module.scss';

// useQuery를 이용해서 firebase에 있는 정보들을 가져오고 캐싱해줌
export default function Products() {
  const {
    isLoading,
    error,
    // data가 있다면 products라는 이름으로 가지고 옴
    data: products,
  } = useQuery(['products'], getProducts); // key, 콜백함수 전달 , 인자=호출 ()=>getProducts() => 생략가능, 함수참조값만 전달
  console.log(products);
  // console.log(`프로덕트: ${products}`);
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
}
