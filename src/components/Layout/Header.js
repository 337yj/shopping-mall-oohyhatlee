import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { login,logout, onUserStateChange } from '../../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import styles from './header.module.scss';
import logo from '../../assets/images/logo.png'

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  //const scrollRef = useRef(null);

  const {user, login, logout} = useAuthContext();
  const navigate = useNavigate();

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };

  const handleScroll = () => {
    console.log(window.scrollY)
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener('scroll', (e)=> {console.log(e)});
  console.log(scrolled)
  useEffect(() => {
    
   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


// /about /shop ~~
  return (
    <header className={`${styles.headerWrap} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.header}>
          <ul>
            <li><a>ABOUT</a></li>
            <li><a>SHOP</a></li>
            <li><a>COMMUNITY</a></li>
            {/* <img src={logo} className={styles.logo}></img> */}
            <li><a>SEARCH</a></li>
            {user && <li><a>CART</a></li>}
            {/* 화면 작아지면 걍 없애자 최소~px부터 나오게하자 */}
            {user && <span>{user.displayName}</span>}
            {/* 로그인한 사용자가 없다면 로그인, 사용자가 있다면 로그아웃 */}
            {!user && <li onClick={login}>Login</li>}
            {user && <li onClick={logout}>Logout</li>}
          </ul>
        </nav>

      </header>
  );
};

export default Header;