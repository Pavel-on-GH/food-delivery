import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem } from '../../store/slices/basketSlice';
import type { FoodListItem } from '../FoodCatalogItem/FoodCatalogItem.types';
import styles from './FoodCatalogItem.module.css';
import type { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import axios from 'axios';

export const FoodCatalogItem = (item: FoodListItem) => {
  const dispatch = useDispatch();
  const basketItem = useSelector((state: RootState) =>
    state.basketReducer.items.find((i) => i._id === item._id),
  );
  const count = basketItem?.count ?? 0;
  const token = useAppSelector((state) => state.authReducer.token);

  const handleAdd = async () => {
    dispatch(
      incrementItem({
        _id: item._id,
        title: item.title,
        price: item.price,
        image: item.image,
      }),
    );

    if (token) {
      await axios.post(
        `http://localhost:4000/api/basket/add`,
        { itemId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  };

  const handleRemove = async () => {
    dispatch(decrementItem(item._id));

    if (token) {
      await axios.post(
        `http://localhost:4000/api/basket/remove`,
        { itemId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  };

  return (
    <div className={styles['food-item']}>
      <div className={styles['food-item__display']}>
        <img
          className={styles['food-item__image']}
          src={`http://localhost:4000/uploads/${item.image}`}
          alt={item.title}
        />
        <div className={styles['food-item__count']}>
          {count === 0 ? (
            <button onClick={handleAdd} className={styles['food-item__btn']}>
              +
            </button>
          ) : (
            <>
              <button
                onClick={handleRemove}
                className={`${styles['food-item__btn']} ${styles['food-item__btn--minus']}`}>
                –
              </button>
              <p>{count}</p>
              <button
                onClick={handleAdd}
                className={`${styles['food-item__btn']} ${styles['food-item__btn--plus']}`}>
                +
              </button>
            </>
          )}
        </div>
      </div>

      <h2 className={styles['food-item__title']}>{`${item.title}: ${item.price} р.`}</h2>
      <p className={styles['food-item__description']}>{item.description}</p>
    </div>
  );
};
