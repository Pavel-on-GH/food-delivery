import styles from './Navbar.module.css';
import { basket, logo } from '../../assets/images/index';
import { Link } from 'react-router-dom';

type NavbarProps = {
  setShowLogin: (showLogin: boolean) => void;
};

export const Navbar = ({ setShowLogin }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Логотип: готовое блюдо" className={styles.logo} />
      </Link>

      <div className={styles.navbar__controls}>
        <Link className={styles.basket} to="/basket">
          <button className={styles.basket}>
            <img className={styles.basket__img} src={basket} alt="Корзина" />
            <div className={styles.basket__indicator}></div>
          </button>
        </Link>

        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className={styles.navbar__button}>
          Войти
        </button>
      </div>
    </nav>
  );
};
