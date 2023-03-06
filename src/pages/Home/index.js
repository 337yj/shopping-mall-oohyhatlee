import React from 'react';
import logo from '../../assets/images/logo.png'
import mainImage from '../../assets/images/mainImg.jpg'
import styles from './home.module.scss';

const Home = () => {
  return (
    <main>
      In order to be irreplaceable one
      must always be different
      대체할 수 없는 존재가 되려면
      늘 남달라야 한다
    <div className={styles.homeWrap}>
      
      <img src={logo} className={styles.logo}></img>
      <img src={mainImage} className={styles.mainImage}></img>
      <img src={mainImage} className={styles.mainImage}></img>
      <img src={mainImage} className={styles.mainImage}></img>
    </div>
    </main>
  );
}

export default Home;