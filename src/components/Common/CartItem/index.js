import React from "react";
import useCart from "../../../hooks/useCart";
import { IconDelete, IconMinus, IconPlus } from "../../../assets/icon";
import styles from "./cartItem.module.scss";

const CartItem = ({
  product,
  product: { id, image, title, option, quantity, price },
}) => {
  const { addOrUpdateItem, removeItem } = useCart();

  const onClickMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const onClickPlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };

  const onClickDelete = () => removeItem.mutate(id);

  return (
    <li className={styles.wrapper}>
      <img className={styles.productImg} src={image} alt={title} />
      <div className={styles.InfoWrap}>
        <p className={styles.title}>
          {title} / {option}
        </p>

        <p>{`₩ ${price.toLocaleString()}`}</p>
        <div className={styles.quantityWrap}>
          <IconMinus onClick={onClickMinus} />
          <span>{quantity}</span>
          <IconPlus onClick={onClickPlus} />
        </div>

        <IconDelete onClick={onClickDelete} />
      </div>
    </li>
  );
};

export default CartItem;
