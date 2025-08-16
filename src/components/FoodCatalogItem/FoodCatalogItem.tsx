import type { FoodListItem } from '../../assets/images';
import styles from './FoodCatalogItem.module.css';

export const FoodCatalogItem = (item: FoodListItem) => {
  return (
    <div key={item._id} className={styles['food-catalog__item']}>
      <img className={styles['food-catalog__image']} src={item.image} alt={item.title} />
      <h2 className={styles['food-catalog__title']}>{`${item.title}: ${item.price} р.`}</h2>
      <p className={styles['food-catalog__description']}>{item.description}</p>
    </div>
  );
};
