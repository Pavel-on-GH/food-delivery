import { useEffect, useState } from 'react';
import styles from './Basket.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { empty_basket } from '../../assets/images/index';
import type { FoodListItem } from '../../components/FoodCatalogItem/FoodCatalogItem.types';

export const Basket = () => {
  const [basketItems, setBasketItems] = useState<(FoodListItem & { count: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setBasketItems([]);
      setLoading(false);
      return;
    }

    const fetchBasket = async () => {
      try {
        const basketRes = await axios.post(
          'http://localhost:4000/api/basket/get',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!basketRes.data.success) {
          setBasketItems([]);
          setLoading(false);
          return;
        }

        const basketData: Record<string, number> = basketRes.data.basketData || {};

        const itemIds = Object.keys(basketData);
        if (itemIds.length === 0) {
          setBasketItems([]);
          setLoading(false);
          return;
        }

        const productsRes = await axios.get('http://localhost:4000/api/food/food-arr');
        if (!productsRes.data.data) {
          setBasketItems([]);
          setLoading(false);
          return;
        }
        const allProducts: FoodListItem[] = productsRes.data.data;

        const productsInBasket = allProducts
          .filter((product) => itemIds.includes(product._id))
          .map((product) => ({
            ...product,
            count: basketData[product._id] || 0,
          }));

        setBasketItems(productsInBasket);
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        setBasketItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBasket();
  }, [token]);

  const total = basketItems.reduce((sum, item) => sum + item.price * item.count, 0);

  if (loading) return <p>Загрузка корзины...</p>;

  if (basketItems.length === 0)
    return (
      <div className={styles['basket']}>
        <h2 className={styles['basket__title']}>В корзине пока пусто</h2>
        <div className={styles['basket__empty-block']}>
          <img className={styles['basket__basket-img']} src={empty_basket} alt="Пустая корзина" />
          <p>Загляните в наш каталог и выберите блюдо по вкусу.</p>
          <Link to="/#categories">
            <button
              type="button"
              className={`${styles['basket__btn']} ${styles['basket__btn--long']}`}>
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
                    onClick={async () => {
                      try {
                        await axios.post(
                          `http://localhost:4000/api/basket/remove`,
                          { itemId: item._id },
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          },
                        );
                        setBasketItems((prev) =>
                          prev
                            .map((i) => (i._id === item._id ? { ...i, count: i.count - 1 } : i))
                            .filter((i) => i.count > 0),
                        );
                      } catch (error) {
                        console.error('Ошибка удаления товара из корзины', error);
                      }
                    }}>
                    -
                  </button>

                  <p>{item.count}</p>

                  <button
                    type="button"
                    className={`${styles['basket__count-btn']} ${styles['basket__count-btn--plus']}`}
                    onClick={async () => {
                      try {
                        await axios.post(
                          `http://localhost:4000/api/basket/add`,
                          { itemId: item._id },
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          },
                        );
                        setBasketItems((prev) =>
                          prev.map((i) => (i._id === item._id ? { ...i, count: i.count + 1 } : i)),
                        );
                      } catch (error) {
                        console.error('Ошибка добавления товара в корзину', error);
                      }
                    }}>
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={`${styles['basket__btn']} ${styles['basket__btn--short']}`}
                  onClick={async () => {
                    try {
                      await axios.post(
                        `http://localhost:4000/api/basket/delete`,
                        { itemId: item._id },
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        },
                      );
                      setBasketItems((prev) => prev.filter((i) => i._id !== item._id));
                    } catch (error) {
                      console.error('Ошибка при полном удалении товара', error);
                    }
                  }}>
                  Удалить
                </button>

                <p>{`${item.price * item.count} р.`}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${styles['basket__btn']} ${styles['basket__btn--long']}`}
            onClick={async () => {
              try {
                await axios.post(
                  `http://localhost:4000/api/basket/clear`,
                  {},
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  },
                );
                setBasketItems([]);
              } catch (error) {
                console.error('Ошибка очистки корзины', error);
              }
            }}>
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
