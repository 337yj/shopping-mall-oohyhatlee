import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";

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
    <section>
      <p>{category}</p>
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>₩{price}</p>
        <p>{description}</p>
        <div>
          <label htmlFor="select">옵션:</label>
          <select id="select" onChange={onChange} value={selected}>
            {/* 옵션의 경우 렌더링 이후에 변경될일 없으니 key값으로 index 괜찮음 */}
            {options &&
              options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
          </select>
        </div>
        {success && <p>{success}</p>}
        <button onClick={onClick}>Add Cart</button>
      </div>
    </section>
  );
};

export default ProductDetail;
