import React from "react";
import useCart from "../../hooks/useCart";
import { Button, CartItem, PriceCard } from "../../components/Common";
import styles from "./myCart.module.scss";

const SHIPPING = 3000;

const MyCart = () => {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0,
    );

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.subHeader}>My Cart</h2>
      {!hasProducts && <p>Your cart is currently empty.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className={styles.priceWrap}>
            <PriceCard text="Total" price={totalPrice || 0} />
            <PriceCard text="Shipping" price={SHIPPING} />
            <PriceCard text="	Subtotal" price={(totalPrice || 0) + SHIPPING} />
          </div>
          <Button text={`PLACE ORDER`} />
        </>
      )}
    </section>
  );
};

export default MyCart;
