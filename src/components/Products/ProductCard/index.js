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
      <img src={image} alt={title} className={styles.productImg} />
      {/* 메타데이터 정보 주기 */}
      <div>
        <h3>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
};

export default ProductCard;
