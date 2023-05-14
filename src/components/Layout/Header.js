import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, onUserStateChange } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./header.module.scss";
import logo from "../../assets/images/logo.svg";
import CartStatus from "../Common/CartStatus";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user, login, logout } = useAuthContext();
  const navigate = useNavigate();

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`${styles.headerWrap} ${scrolled ? styles.scrolled : ""}`}
    >
      <nav className={styles.header}>
        <ul>
          {isMobile ? (
            <>
              <li className={styles.logo} onClick={onClick("/")}>
                OohYhatLee
              </li>
              <li>MENU</li>
            </>
          ) : (
            <>
              <div className={styles.leftSide}>
                <li onClick={onClick("/products")}>SHOP</li>
                <li onClick={onClick("/products")}>ABOUT</li>
              </div>

              <li className={styles.logo} onClick={onClick("/")}>
                OohYhatLee
              </li>

              <div className={styles.rightSide}>
                <li>SEARCH</li>
                <li onClick={onClick("carts")}>
                  <CartStatus />
                </li>
                {user && user.isAdmin && (
                  <li onClick={onClick("/products/new")}>NEW</li>
                )}
                {!user && <li onClick={login}>LOGIN</li>}
                {user && <li onClick={logout}>LOGOUT</li>}
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
