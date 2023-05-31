import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import CartStatus from "../Common/CartStatus";
import styles from "./header.module.scss";
import { throttle } from "lodash";
import { Login, Logout, Menu } from "../../assets/index";
import { scroller } from "react-scroll";

const Header = () => {
  const { user, login, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 500 && location.pathname === "/") {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth <= 767);
    };

    // 초기 렌더링 시에 handleResize 호출하여 isMobile 상태 업데이트
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.headerWrap}>
      <ul>
        {isMobile ? (
          <div className={styles.mobileHeader}>
            <li className={styles.mobileMenu}>
              <Menu />
            </li>

            <li
              className={`${styles.logo} ${
                location.pathname !== "/" || scrolled ? styles.scrolled : ""
              }`}
              onClick={onClick("/")}
            >
              OohYhatLee
            </li>
          </div>
        ) : (
          <div className={styles.header}>
            <div className={styles.leftSide}>
              <li onClick={onClick("/products")}>Shop the Collection</li>
              <li onClick={() => scrollToSection("landing_section3")}>About</li>
              <li onClick={() => scrollToSection("landing_section2")}>
                Inspirational
              </li>
            </div>

            <div className={styles.rightSide}>
              <li
                className={`${styles.logo} ${
                  location.pathname !== "/" || scrolled ? styles.scrolled : ""
                }`}
                onClick={onClick("/")}
              >
                OohYhatLee
              </li>
              {user && user.isAdmin && (
                <li onClick={onClick("/products/new")}>New</li>
              )}
              {!user && (
                <li className={styles.login} onClick={login}>
                  <Login />
                </li>
              )}
              {user && (
                <li className={styles.logout} onClick={logout}>
                  <Logout />
                </li>
              )}
              <li onClick={onClick("carts")}>
                <CartStatus />
              </li>
            </div>
          </div>
        )}
      </ul>
    </header>
  );
};

export default Header;
