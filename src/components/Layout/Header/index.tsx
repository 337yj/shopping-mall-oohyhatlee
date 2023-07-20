import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import CartStatus from "../../Common/CartStatus";
import { scroller } from "react-scroll";
import { Login, Logout, Menu, IconClose } from "../../../assets/index";
import styles from "./header.module.scss";

const Header = () => {
  const { user, login, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onClick = (path: string) => {
    return () => {
      setIsOpen(false);
      navigate(path);
    };
  };

  const scrollToSection = (section: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      scroller.scrollTo(section, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    } else {
      navigate("/", { state: { scrollToSection: section } });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 500 && location.pathname === "/") {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const onClickIcon: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const onPopState = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("popstate", onPopState);
    };
  }, [dropdownRef]);

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

  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const section = location.state.scrollToSection;
      scroller.scrollTo(section, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location.state]);

  return (
    <header className={styles.headerWrap}>
      <ul>
        {isMobile ? (
          <div className={styles.mobileHeader}>
            <div
              className={`${styles.dropdownWrapper} ${
                isOpen ? styles.isOpen : ""
              }`}
              ref={dropdownRef}
            >
              {isOpen ? (
                <IconClose onClick={onClickIcon} className={styles.icon} />
              ) : (
                <Menu onClick={onClickIcon} className={styles.icon} />
              )}

              <menu
                className={`${styles.itemWrapper} ${
                  isOpen ? styles.isOpen : ""
                }`}
              >
                <li className={styles.item} onClick={onClick("/products")}>
                  Shop the Collection
                </li>
                <li
                  className={styles.item}
                  onClick={() => scrollToSection("landing_section5")}
                >
                  About
                </li>
                <li
                  className={styles.item}
                  onClick={() => scrollToSection("landing_section3")}
                >
                  Inspirational
                </li>
                <li onClick={onClick("carts")} className={styles.item}>
                  Cart
                </li>
                {user && user.isAdmin && (
                  <li
                    onClick={onClick("/products/new")}
                    className={styles.item}
                  >
                    New
                  </li>
                )}
                {!user && (
                  <li className={styles.item} onClick={login}>
                    Login
                  </li>
                )}
                {user && (
                  <li className={styles.item} onClick={logout}>
                    Logout
                  </li>
                )}
              </menu>
            </div>

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
              <li onClick={() => scrollToSection("landing_section5")}>About</li>
              <li onClick={() => scrollToSection("landing_section3")}>
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
              <li onClick={onClick("/carts")}>
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
