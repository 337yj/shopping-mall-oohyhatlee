import React from "react";

interface Price {
  text: string;
  price: number;
}

const PriceCard = ({ text, price }: Price) => {
  return (
    <div>
      <p>{text}</p>
      <p>{`₩ ${price.toLocaleString()}`}</p>
    </div>
  );
};

export default PriceCard;
