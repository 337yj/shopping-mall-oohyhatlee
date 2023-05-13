import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../api/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./cartStatus.module.scss";
import useCart from "../../../hooks/useCart";

const CartStatus = () => {
  // getCart에 userId 전달해줘야하니
  // const { uid } = useAuthContext();
  // const { data: products } = useQuery(["carts"], () => getCart(uid));
  const {
    cartQuery: { data: products },
  } = useCart();
  return (
    <div className={styles.wrapper}>
      CART {products && <p className={styles.cartStatus}>{products.length}</p>}
    </div>
  );
};

export default CartStatus;
