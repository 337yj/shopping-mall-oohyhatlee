import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./productCard.module.scss";
import { Product } from "../../../types/common";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const onClick = (path: string) => {
    return () => {
      navigate(`/${path}`, { state: { product } });
    };
  };

  return (
    <li
      onClick={onClick(`products/${product.id}`)}
      className={styles.productCardWrap}
    >
      <div className={styles.productImgWrap}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImg}
        />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <p>{`₩ ${product.price.toLocaleString()}`}</p>
      </div>
    </li>
  );
};

export default ProductCard;
