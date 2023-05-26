import React, { useEffect, useRef, useState } from "react";
import Products from "../../components/Common/Products";
import logo from "../../assets/images/logo.svg";
import mainImage from "../../assets/images/mainImg.jpg";
import mainImage7 from "../../assets/images/mainImg7.jpg";
import cx from "classnames";
import styles from "./home.module.scss";
import useIntersectionObsever from "../../hooks/observer";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { Element } from "react-scroll";

const Home = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const [scrollPosition, setScrollPosition] = useState(0);
  const animation1 = useScrollFadeIn("boo", 2, 0.2);
  const animation2 = useScrollFadeIn("right", 2, 0);
  const animation3 = useScrollFadeIn("left", 2, 0);
  const animation4 = useScrollFadeIn("left", 1, 0.6);
  const animation5 = useScrollFadeIn("up", 1, 0.3);
  const animation6 = useScrollFadeIn("boo", 1, 0.3);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 추가

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.landing_section1}>
        <img src={mainImage7} className={styles.mainImage6} alt="product" />
        <img {...animation1} src={logo} className={styles.logo} alt="Logo" />
      </section>
      <Element name="landing_section2">
        <section className={styles.landing_section2}>
          <div></div>
          <p {...animation2}>
            {/* In Order To Be <br />
          Irreplaceable <br />
          One Must <br />
          Always Be <br />
          Different */}
            <span>Inspirational</span>
            Fashion is not merely a matter of clothing. Fashion permeates the
            air, carried by the wind. People feel it, they breathe it in. It
            exists in the sky and on the streets. It exists everywhere. It stems
            from thoughts, conventions, and events.
          </p>
        </section>
      </Element>
      <Element name="landing_section3">
        <section className={styles.landing_section3}>
          <img src={mainImage} className={styles.mainImage8} alt="product" />
          <p {...animation3}>
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
        </section>
      </Element>
      <section className={styles.landing_section4}>
        <Products />
        <div className={styles.gradient}></div>
      </section>
    </div>
  );
};

export default Home;
