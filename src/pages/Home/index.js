import React, { useEffect, useState } from "react";
import Products from "../../components/Common/Products";
import logo from "../../assets/images/logo.svg";
import whiteLogo from "../../assets/images/whiteLogo.png";
import mainImage from "../../assets/images/mainImg.jpg";
import mainImage2 from "../../assets/images/mainImg2.jpg";
import mainImage3 from "../../assets/images/mainImg3.jpg";
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
      </section>

      <Products />
    </main>
  );
};

export default Home;
