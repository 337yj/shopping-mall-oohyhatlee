import React, { useEffect, useState } from "react";
import Products from "../../components/Common/Products";
import logo from "../../assets/images/logo.svg";
import whiteLogo from "../../assets/images/whiteLogo.png";
import mainImage from "../../assets/images/mainImg.jpg";
import mainImage2 from "../../assets/images/mainImg2.jpg";
import mainImage3 from "../../assets/images/mainImg3.jpg";
import product1 from "../../assets/images/product1.jpg";
import product2 from "../../assets/images/product2.jpg";
import product3 from "../../assets/images/product3.jpg";
import styles from "./home.module.scss";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth <= 768);
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowSection(scrollPosition > 0);
  }, [scrollPosition]);

  return (
    <main className={styles.wrapper}>
      <img src={mainImage} className={styles.mainImage} />

      <section
        id="section"
        className={`${styles.section} ${showSection ? "" : styles.show}`}
        style={{
          transform: `translateY(-${scrollPosition}px)`,
        }}
      >
        <div className={styles.descriptionWrap}>
          <p className={styles.description}>
            In Order To Be Irreplaceable One Must Always Be Different
          </p>
          <img src={whiteLogo} className={styles.logo} alt="Logo" />
        </div>
        <div className={styles.productWrap}>
          <img src={product1} className={styles.product1} alt="product" />
          <img src={product2} className={styles.product2} alt="product" />
          <img src={product3} className={styles.product3} alt="product" />
        </div>
      </section>

      <Products />
    </main>
  );
};

export default Home;
