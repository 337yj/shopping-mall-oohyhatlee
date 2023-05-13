import React, { useMemo, useState } from "react";
import { addOrUpdateToCart, removeFromCart } from "../../../api/firebase";
import { IconDelete, IconMinus, IconPlus } from "../../../assets/icon";
import useCart from "../../../hooks/useCart";
import { v4 as uuid } from "uuid";
import styles from "./cartItem.module.scss";

const CartItem = ({
  product,
  product: { id, image, title, option, price, quantity },
}) => {
  const { addOrUpdateItem, removeItem } = useCart();
  // const [quantity, setQuantity] = useState(product.quantity);

  // const handleIncreaseQuantity = () => {
  //   const updatedProduct = { ...product, quantity: quantity + 1 };
  //   addOrUpdateItem.mutate(updatedProduct);
  //   setQuantity(quantity + 1);
  // };

  // const handleDecreaseQuantity = () => {
  //   if (quantity > 1) {
  //     const updatedProduct = { ...product, quantity: quantity - 1 };
  //     addOrUpdateItem.mutate(updatedProduct);
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const handleRemoveItem = () => {
  //   removeItem.mutate(id);
  // };
  const onClickPlus = () => {
    const updatedProduct = { ...product, quantity: quantity + 1 };
    addOrUpdateItem.mutate(updatedProduct);
  };
  // const onClickPlus = () => {
  //   addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  // };
  const onClickMinus = () => {
    // quantity가 1개이면 마이너스 못하도록
    if (quantity < 2) return;
    // 현재 유저 uid
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const onClickDelete = () => removeItem.mutate(id);
  // const cartItemId = `${product.id}_${JSON.stringify(product.option)}`;
  const uniqueId = `${id}_${option}_${uuid()}`;

  const productKey = useMemo(() => uniqueId, [uniqueId]);
  return (
    <li key={productKey} className={styles.wrapper}>
      <img className={styles.productImg} src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{option}</p>
        <p>₩{price}</p>
        {/* 수량 +,-, 삭제버튼 추가하기 */}
        {/* <icon onClick={onClickMinus } />
        <icon onClick={onClickPlus } />
        <icon onClick={onClickDelete } /> */}
        <IconPlus onClick={onClickPlus} />
        <span>{quantity}</span>
        <IconMinus onClick={onClickMinus} />
        <IconDelete onClick={onClickDelete} />
      </div>
    </li>
  );
};

export default CartItem;
