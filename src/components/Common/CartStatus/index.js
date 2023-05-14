import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../api/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./cartStatus.module.scss";
import useCart from "../../../hooks/useCart";

const CartStatus = () => {
  const { user, login, logout } = useAuthContext();
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className={styles.wrapper}>
      CART
      {user && (
        <p className={styles.cartStatus}>{products ? products.length : 0}</p>
      )}
    </div>
  );
};

export default CartStatus;
