import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./productCard.module.scss";

const ProductCard = ({
  product,
  product: { id, image, title, category, price },
}) => {
  const navigate = useNavigate();

  const onClick = (path) => {
    return () => {
      navigate(`/${path}`, { state: { product } });
    };
  };

  return (
    <li onClick={onClick(`products/${id}`)} className={styles.productCardWrap}>
      <div className={styles.productImgWrap}>
        <img src={image} alt={title} className={styles.productImg} />
      </div>
      <div className={styles.productInfo}>
        <h3>{title}</h3>
        <p>{`₩ ${price.toLocaleString()}`}</p>
      </div>
    </li>
  );
};

export default ProductCard;
