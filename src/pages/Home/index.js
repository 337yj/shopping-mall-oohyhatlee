import React, { useEffect, useRef, useState } from "react";
import Products from "../../components/Common/Products";
import { logo } from "../../assets/index";

import { mainImg2, mainImg3 } from "../../assets/index";

import productImg from "../../assets/images/productImg.jpg";
import productImg2 from "../../assets/images/productImg2.jpg";

import cx from "classnames";
import styles from "./home.module.scss";
import useIntersectionObsever from "../../hooks/observer";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { Element } from "react-scroll";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  const animation1 = useScrollFadeIn("right", 1, 0.4);
  const animation2 = useScrollFadeIn("left", 1, 0.2);
  const animation3 = useScrollFadeIn("down", 1, 1.2);
  const animation4 = useScrollFadeIn("left", 1, 0.6);
  const animation5 = useScrollFadeIn("place", 1, 1);
  const animation6 = useScrollFadeIn("place", 1, 0.3);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={styles.wrapper}>
      <section className={styles.landing_section1}>
        <div className={styles.logoWrap}>
          <img
            src={logo}
            className={`${styles.logo} ${scrolled ? styles.scrolled : ""}`}
            alt="Logo"
          />
        </div>
      </section>
      <section className={styles.landing_section2}>
        <img src={mainImg2} className={styles.mainImg2} alt="mainImage" />
        <div className={styles.descriptionWrap1}>
          <article {...animation1} className={styles.description}>
            <p className={styles.text1}>Slow</p>
          </article>
          <article {...animation2} className={styles.description}>
            <p className={styles.text2}>Down</p>
          </article>
          <article {...animation3} className={styles.description}>
            <p className={styles.text3}>Summer</p>
          </article>
        </div>

        <div className={styles.descriptionWrap2}>
          <img src={mainImg3} className={styles.mainImg3} alt="mainImage" />

          <p {...animation4} className={styles.text1}>
            INSPRTED
            {/* Sensitive */}
            {/* <h4>Fashion is instant language.</h4>
            Fashion is very important. It is life-enhancing, and, like
            everything that gives pleasure, it is worth doing well.
            <span> Fashion is language, importance, joy.</span> */}
          </p>
          <p {...animation5} className={styles.text2}>
            Sensitive
          </p>
        </div>
      </section>
      <section className={styles.landing_section3}>
        <p {...animation6}>
          <span>Inspirational</span>
          Fashion is not merely a matter of clothing. Fashion permeates the air,
          carried by the wind. People feel it, they breathe it in. It exists in
          the sky and on the streets. It exists everywhere. It stems from
          thoughts, conventions, and events.
        </p>
      </section>

      <section className={styles.landing_section4}>
        <p>SENSITIVE</p>
        <img src={productImg} className={styles.productImg} alt="product" />
        {/* <img src={productImg2} className={styles.productImg2} alt="product" />
        <img src={productImg3} className={styles.productImg3} alt="product" /> */}
      </section>

      <section className={styles.landing_section5}>
        <p>SENSITIVE</p>

        {/* <img src={productImg2} className={styles.productImg2} alt="product" />
        <img src={productImg3} className={styles.productImg3} alt="product" /> */}
      </section>

      <section className={styles.landing_section6}>
        <p>SENSITIVE</p>

        {/* <img src={productImg2} className={styles.productImg2} alt="product" />
        <img src={productImg3} className={styles.productImg3} alt="product" /> */}
      </section>
    </main>
  );
};

export default Home;
