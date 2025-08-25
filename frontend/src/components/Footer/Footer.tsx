import styles from './Footer.module.css';
import logo from '../../assets/images/logo.svg';
import twitter from '../../assets/images/contacts/twitter_icon.png';
import facebook from '../../assets/images/contacts/facebook_icon.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles['footer__col']}>
        <Link to="/">
          <img src={logo} className={styles['footer__logo']} alt="Логотип: готовое блюдо" />
        </Link>

        <div className={styles['footer__social-links']}>
          <img src={twitter} alt="Иконка твиттера" />
          <img src={facebook} alt="Иконка фейсбука" />
        </div>
      </div>
      <div className={styles['footer__col']}>
        <h2 className={styles['footer__title']}>Компания</h2>
        <ul className={styles['footer__list']}>
          <li className={styles['footer__list-item']}>
            <Link to="/">Главная</Link>
          </li>
          <li className={styles['footer__list-item']}>Доставка</li>
          <li className={styles['footer__list-item']}>О нас</li>
        </ul>
      </div>
      <div className={styles['footer__col']}>
        <h2 className={styles['footer__title']}>Контакты</h2>
        <ul className={styles['footer__list']}>
          <li className={styles['footer__list-item']}>
            <a href="tel:+79998887766">Телефон: +7-(999)-888-77-66</a>
          </li>
          <li className={styles['footer__list-item']}>
            <a href="mailto:FoodDelivery@yandex.ru">E-mail: FoodDelivery@yandex.ru</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
