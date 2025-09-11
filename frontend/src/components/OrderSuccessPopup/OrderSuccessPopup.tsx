import { useAppSelector } from '../../store/hooks';
import styles from './OrderSuccessPopup.module.css';
import type { OrderSuccessPopupProps } from './OrderSuccessPopup.types';

export const OrderSuccessPopup = ({ setShowSuccess }: OrderSuccessPopupProps) => {
  const token = useAppSelector((state) => state.authReducer.token);
  if (token) {
    return (
      <div
        className={styles['popup']}
        onClick={() => setShowSuccess(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title">
        <div className={styles['popup__content']} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles['popup__title']} id="order-success-title">
            Заказ успешно оформлен
          </h2>

          <p className={styles['popup__text']}>
            Благодарим за заказ!
            <br />
            Наши сотрудники свяжутся с вами в течении 15 минут для уточнения подробностей.
          </p>
          <button
            className={styles['popup__close-btn']}
            onClick={() => setShowSuccess(false)}
            aria-label="Закрыть уведомление">
            Х
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div
        className={styles['popup']}
        onClick={() => setShowSuccess(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title">
        <div className={styles['popup__content']} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles['popup__title']} id="order-success-title">
            Заказ не выполнен
          </h2>

          <p className={styles['popup__text']}>
            Оформление заказа доступно только авторизаванным пользователям.
            <br />
            Пожалуйста, авторизуйтесь, чтобы продолжить.
          </p>
          <button
            className={styles['popup__close-btn']}
            onClick={() => setShowSuccess(false)}
            aria-label="Закрыть уведомление">
            Х
          </button>
        </div>
      </div>
    );
};
