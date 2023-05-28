import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../../api/firebase";
import { Button } from "../../components/Common";
import { useAuthContext } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import styles from "./productDetail.module.scss";

const ProductDetail = () => {
  // 장바구니 -> 사용자 id, 제품정보를 받아와서 firebase함수 호출하면됨
  // const { uid } = useAuthContext();
  const { addOrUpdateItem } = useCart();

  // 파람으로 전달받은 state를 받아옴
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);

  const onChange = (e) => setSelected(e.target.value);
  const onClick = (e) => {
    // 장바구니 추가
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  return (
    <section className={styles.wrapper}>
      {/* <p>{category}</p> */}
      <img src={image} alt={title} />
      <div className={styles.InfoWrap}>
        <h2>{title}</h2>
        <p className={styles.summaryInfo}>{description}</p>

        <p className={styles.description}>
          OohYhatLee Shop offers clothing products that are crafted with
          high-quality materials, ensuring a perfect balance of style and
          comfort. It allows you to express your fashion sense and create a
          unique style of your own. Explore OohYhatLee Shop and showcase your
          fashion sense by embracing its high-quality garments that effortlessly
          blend style and comfort. Unleash your creativity and embrace a
          distinct fashion style with OohYhatLee Shop.
        </p>

        <div className={styles.mainInfo}>
          <div className={styles.optionWrap}>
            <label htmlFor="select">OPTION:</label>
            <select id="select" onChange={onChange} value={selected}>
              {/* 옵션의 경우 렌더링 이후에 변경될일 없으니 key값으로 index 괜찮음 */}
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <p className={styles.price}>₩ &nbsp;{price}</p>
        </div>
        {success && <p>{success}</p>}

        {/* <button
          className={`${styles.customBtn} ${styles.btn1}`}
          onClick={onClick}
        >
          ADD &nbsp; TO &nbsp;CART
        </button> */}
        <Button text={`ADD  TO CART`} />
      </div>
    </section>
  );
};

export default ProductDetail;
