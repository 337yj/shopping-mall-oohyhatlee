import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { Button } from "../../components/Common";
import styles from "./productDetail.module.scss";

const ProductDetail = () => {
  // 장바구니 -> 사용자 id, 제품정보를 받아와서 firebase함수 호출하면됨
  // const { uid } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const navigate = useNavigate();

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
        setSuccess("Go to Cart?");
        setTimeout(() => setSuccess(null), 6000);
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
            {/* <div class="select"> */}
            <select id="select" onChange={onChange} value={selected}>
              {/* 옵션의 경우 렌더링 이후에 변경될일 없으니 key값으로 index 괜찮음 */}
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
            {/* </div> */}
          </div>
          <p className={styles.price}>₩ &nbsp;{price}</p>
        </div>
        <Button text={`ADD  TO CART`} onClick={onClick} />
        {success && (
          <p className={styles.successText} onClick={() => navigate("/carts")}>
            {success}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
