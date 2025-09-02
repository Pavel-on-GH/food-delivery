import styles from './Navbar.module.css';
import { basket, logo } from '../../assets/images/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import type { NavbarProps } from './Navbar.types';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export const Navbar = ({ setShowLogin }: NavbarProps) => {
  const basketItems = useSelector((state: RootState) => state.basketReducer.items);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Логотип: готовое блюдо" className={styles.logo} />
      </Link>

      <div className={styles.navbar__controls}>
        <Link className={styles.basket} to="/basket">
          <button className={styles.basket}>
            <img className={styles.basket__img} src={basket} alt="Корзина" />
            {basketItems.length !== 0 ? <div className={styles.basket__indicator}></div> : ''}
          </button>
        </Link>

        <button
          onClick={() => {
            if (!token) setShowLogin(true);
            else dispatch(logout());
          }}
          className={styles.navbar__button}>
          {!token ? 'Войти' : 'Выйти'}
        </button>
      </div>
    </nav>
  );
};
