import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext";
import { getCart } from "../../api/firebase";
import { CartItem, PriceCard } from "../../components/Common";
import useCart from "../../hooks/useCart";

const SHIPPING = 3000;

const MyCart = () => {
  // getCart에 userId 전달해줘야하니
  // const { uid } = useAuthContext();

  // const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section>
      <p>MyCart</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <PriceCard text="배송액" price={SHIPPING} />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <button>주문하기</button>
        </>
      )}
    </section>
  );
};

export default MyCart;
