import { useEffect } from 'react';
import styles from './Basket.module.css';
import { useAppSelector } from '../../store/hooks';
import { useBasketActions } from '../../hooks/useBasketActions';
import { Link } from 'react-router-dom';
import { empty_basket } from '../../assets/images/index';

export const Basket = () => {
  const basketItems = useAppSelector((state) => state.basketReducer.items);
  const token = useAppSelector((state) => state.authReducer.token);
  const { addToBasket, removeFromBasket, deleteFromBasket, clearUserBasket } = useBasketActions();

  const total = basketItems.reduce((sum, item) => sum + item.price * item.count, 0);

  useEffect(() => {}, [token]);

  if (basketItems.length === 0)
    return (
      <div className={styles['basket']}>
        <h2 className={styles['basket__title']}>В корзине пока пусто</h2>
        <div className={styles['basket__empty-block']}>
          <img className={styles['basket__basket-img']} src={empty_basket} alt="Пустая корзина" />
          <p>Загляните в наш каталог и выберите блюдо по вкусу.</p>
          <Link to="/#categories">
            <button className={`${styles['basket__btn']} ${styles['basket__btn--long']}`}>
              Перейти к выбору блюда
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles['basket']}>
      <h2 className={styles['basket__title']}>Корзина</h2>
      <div className={styles['basket__container']}>
        <div className={styles['basket__main-block']}>
          <ul className={styles['basket__list']}>
            {basketItems.map((item) => (
              <li className={styles['basket__item']} key={item._id}>
                <img
                  className={styles['basket__img']}
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt={item.title}
                />

                <p>{item.title}</p>

                <div className={styles['basket__counts']}>
                  <button
                    type="button"
                    className={`${styles['basket__count-btn']} ${styles['basket__count-btn--minus']}`}
                    onClick={() => removeFromBasket(item._id)}>
                    –
                  </button>

                  <p>{item.count}</p>

                  <button
                    type="button"
                    className={`${styles['basket__count-btn']} ${styles['basket__count-btn--plus']}`}
                    onClick={() =>
                      addToBasket({
                        _id: item._id,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                      })
                    }>
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={`${styles['basket__btn']} ${styles['basket__btn--short']}`}
                  onClick={() => deleteFromBasket(item._id)}>
                  Удалить
                </button>

                <p>{item.price * item.count} р.</p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${styles['basket__btn']} ${styles['basket__btn--long']}`}
            onClick={clearUserBasket}>
            Очистить корзину
          </button>
        </div>

        <div className={styles['basket__order-block']}>
          <h3>Итого: {total} р.</h3>
          <button type="button" className={styles['basket__btn']}>
            Сделать заказ
          </button>
        </div>
      </div>
    </div>
  );
};
