import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { Element } from "react-scroll";
import { logo, IconArrow } from "../../assets/index";
import { mainImg2, mainImg3, mainImg4, mainImg5 } from "../../assets/index";
import styles from "./home.module.scss";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrolled2, setScrolled2] = useState(false);
  const [scrolled3, setScrolled3] = useState(false);

  const navigate = useNavigate();
  const animation1 = useScrollFadeIn({
    direction: "down",
    duration: 1,
    delay: 0.2,
  });
  const animation2 = useScrollFadeIn({
    direction: "left",
    duration: 1,
    delay: 0.2,
  });
  const animation3 = useScrollFadeIn({
    direction: "up",
    duration: 1,
    delay: 0.8,
  });
  const animation4 = useScrollFadeIn({
    direction: "left",
    duration: 1,
    delay: 0.4,
  });
  const animation5 = useScrollFadeIn({
    direction: "place",
    duration: 1,
    delay: 0.4,
  });
  const animation6 = useScrollFadeIn({
    direction: "up",
    duration: 1,
    delay: 0.1,
  });
  const animation7 = useScrollFadeIn({
    direction: "left",
    duration: 1,
    delay: 0.3,
  });
  const animation8 = useScrollFadeIn({
    direction: "left",
    duration: 1,
    delay: 0.3,
  });

  const onClick = (path: string) => {
    return () => {
      navigate(path);
    };
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight; // 화면의 높이
    const scrollHeight = window.scrollY; // 스크롤된 영역의 높이
    const scrollRatio = scrollHeight / windowHeight; // 스크롤된 영역의 높이를 화면의 높이로 나눈 비율

    if (scrollHeight > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (document.documentElement.clientWidth <= 767) {
      if (scrollRatio > 3.3) {
        setScrolled2(false);
      } else if (scrollRatio > 2.5) {
        setScrolled2(true);
      } else {
        setScrolled2(false);
      }

      if (scrollRatio > 4.5) {
        setScrolled3(true);
      } else {
        setScrolled3(false);
      }
    }

    if (document.documentElement.clientWidth >= 767) {
      if (scrollRatio > 2.3) {
        setScrolled2(false);
      } else if (scrollRatio > 1.5) {
        setScrolled2(true);
      } else {
        setScrolled2(false);
      }

      if (scrollRatio > 3.5) {
        setScrolled3(true);
      } else {
        setScrolled3(false);
      }
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
          </p>
          <p {...animation5} className={styles.text2}>
            Sensitive
          </p>
        </div>
      </section>

      <Element name="landing_section3" className={styles.landingElement1} />
      <section className={styles.landing_section3}>
        <div className={styles.descriptionWrap}>
          <p
            className={`${styles.description} ${
              scrolled2 ? styles.scrolled : ""
            }`}
          >
            <span>Inspirational</span>
            Fashion is not merely a matter of clothing. Fashion permeates the
            air, carried by the wind. People feel it, they breathe it in. It
            exists in the sky and on the streets. It exists everywhere. It stems
            from thoughts, conventions, and events.
          </p>
        </div>
      </section>

      <section className={styles.landing_section4}>
        <div
          {...animation6}
          className={styles.linkWrap}
          onClick={onClick("/products")}
        >
          <a>
            Shop The <br />
            Collection
          </a>
          <IconArrow />
        </div>

        <img src={mainImg4} className={styles.mainImg4} alt="mainImage" />
        <img src={mainImg5} className={styles.mainImg5} alt="mainImage" />
        <div className={styles.subDescription}>
          <p {...animation7} className={styles.text1}>
            Summer 2023
          </p>
          <p {...animation8} className={styles.text2}>
            Collection
          </p>
        </div>
      </section>

      <Element name="landing_section5" />
      <section className={styles.landing_section5}>
        <div className={styles.descriptionWrap}>
          <p
            className={`${styles.description} ${
              scrolled3 ? styles.scrolled : ""
            }`}
          >
            <span>Introduction</span>
            OohYhatLee is a clothing store that combines vintage designs with
            innovative styles. Our goal is to provide customers with
            high-quality, comfortable clothing while prioritizing sustainable
            values and ethical production methods. <br />
            <br />
            We offer unique and trendy items with meticulous attention to detail
            and luxurious materials. By using renewable resources, eco-friendly
            materials, and recyclable packaging, we support the sustainable
            fashion industry. <br />
            <br />
            <span>
              Join us for a special and meaningful fashion experience that
              combines style and ethics.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
