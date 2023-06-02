import React, { useMemo, useState } from "react";
import { addOrUpdateToCart, removeFromCart } from "../../../api/firebase";
import { IconDelete, IconMinus, IconPlus } from "../../../assets/icon";
import useCart from "../../../hooks/useCart";
import { v4 as uuid } from "uuid";
import styles from "./cartItem.module.scss";
const CartItem = ({
  product,
  product: { id, image, title, option, quantity, price },
}) => {
  const { addOrUpdateItem, removeItem } = useCart();
  // const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const onClickMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const onClickPlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };

  const onClickDelete = () => removeItem.mutate(id);

  // const uniqueId = `${id}_${option}_${uuid()}`;
  // const productKey = useMemo(() => uniqueId, [uniqueId]);

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
