import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem } from '../../store/slices/basketSlice';
import type { FoodListItem } from '../FoodCatalogItem/FoodCatalogItem.types';
import styles from './FoodCatalogItem.module.css';
import type { RootState } from '../../store/store';

export const FoodCatalogItem = (item: FoodListItem) => {
  const dispatch = useDispatch();
  const basketItem = useSelector((state: RootState) =>
    state.basketReducer.items.find((i) => i._id === item._id),
  );
  const count = basketItem?.count ?? 0;

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
            <button
              onClick={() =>
                dispatch(
                  incrementItem({
                    _id: item._id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  }),
                )
              }
              className={styles['food-item__btn']}>
              +
            </button>
          ) : (
            <>
              <button
                onClick={() => dispatch(decrementItem(item._id))}
                className={`${styles['food-item__btn']} ${styles['food-item__btn--minus']}`}>
                –
              </button>
              <p>{count}</p>
              <button
                onClick={() =>
                  dispatch(
                    incrementItem({
                      _id: item._id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                    }),
                  )
                }
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
