import { food_arr } from '../../assets/images';
import styles from './FoodCatalog.module.css';

export const FoodCatalog = () => {
  return (
    <div className={styles['food-catalog']}>
      <div className={styles['food-catalog__block']}>
        {food_arr.map((item) => {
          return (
            <div key={item._id} className={styles['food-catalog__item']}>
              <img className={styles['food-catalog__image']} src={item.image} alt={item.title} />
              <h2 className={styles['food-catalog__title']}>{`${item.title}: ${item.price} р.`}</h2>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
