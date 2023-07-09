import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <ul className={styles.leftSide}>
        <li>Instagram</li>
        <li>Newsletter</li>
        <li>Stockists</li>
        <li>Partnership</li>
        <li>Contact</li>
      </ul>
      <ul className={styles.rightSide}>
        <li>Terms</li>
        <li>Privacy</li>
        <li>© OohYhatLee Earth 2023</li>
      </ul>
    </footer>
  );
};

export default Footer;
