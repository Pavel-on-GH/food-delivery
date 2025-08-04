import styles from './Navbar.module.css';
// import { logo, basket } from '../assets/images/index';
import { basket, logo } from '../assets/images/index';
import { useState } from 'react';

export const Navbar = () => {
  const [active, setActive] = useState('main');

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Логотип: готовое блюдо" className={styles.logo} />

      <ul className={styles['navbar__menu-list']}>
        <li
          onClick={() => {
            setActive('main');
          }}
          className={`${styles['navbar__menu-item']} ${
            active === 'main' ? styles['navbar__menu-item_active'] : ''
          }`}>
          Главная
        </li>

        <li
          onClick={() => {
            setActive('menu');
          }}
          className={`${styles['navbar__menu-item']} ${
            active === 'menu' ? styles['navbar__menu-item_active'] : ''
          }`}>
          Меню
        </li>

        <li
          onClick={() => {
            setActive('contacts');
          }}
          className={`${styles['navbar__menu-item']} ${
            active === 'contacts' ? styles['navbar__menu-item_active'] : ''
          }`}>
          Контакты
        </li>
      </ul>
      <div className={styles.navbar__controls}>
        <button className={styles.basket}>
          <img className={styles.basket__img} src={basket} alt="Корзина" />
          <div className={styles.basket__indicator}></div>
        </button>
        <button className={styles.navbar__button}>Войти</button>
      </div>
    </nav>
  );
};
