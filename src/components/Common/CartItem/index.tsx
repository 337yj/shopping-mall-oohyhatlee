import React from "react";
import useCart from "../../../hooks/useCart";
import { IconDelete, IconMinus, IconPlus } from "../../../assets/icon";
import styles from "./cartItem.module.scss";
import { Product } from "../../../types/common";

const CartItem = ({ product }: { product: Product }) => {
  const { addOrUpdateItem, removeItem } = useCart();

  const onClickMinus = () => {
    if (product.quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: product.quantity - 1 });
  };

  const onClickPlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: product.quantity + 1 });
  };

  const onClickDelete = () => removeItem.mutate(product.id);

  return (
    <li className={styles.wrapper}>
      <img
        className={styles.productImg}
        src={product.image}
        alt={product.title}
      />
      <div className={styles.InfoWrap}>
        <p className={styles.title}>
          {product.title} {product.options}
        </p>

        <p>{`₩ ${product.price.toLocaleString()}`}</p>
        <div className={styles.quantityWrap}>
          <IconMinus onClick={onClickMinus} />
          <span>{product.quantity}</span>
          <IconPlus onClick={onClickPlus} />
        </div>

        <IconDelete onClick={onClickDelete} />
      </div>
    </li>
  );
};

export default CartItem;
