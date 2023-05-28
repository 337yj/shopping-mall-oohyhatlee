import React from "react";
import styles from "./button.module.scss";

const Button = ({ text, onClick }) => {
  return (
    <button className={`${styles.customBtn} ${styles.btn1}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
