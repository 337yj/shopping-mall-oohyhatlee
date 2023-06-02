import React from "react";

const PriceCard = ({ text, price }) => {
  return (
    <div>
      <p>{text}</p>
      <p>{`₩ ${price.toLocaleString()}`}</p>
    </div>
  );
};

export default PriceCard;
