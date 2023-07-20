import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;