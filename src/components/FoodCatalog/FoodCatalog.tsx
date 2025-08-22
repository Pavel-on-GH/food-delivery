import { food_arr } from '../../assets/images';
import { useAppSelector } from '../../store/hooks';
import { FoodCatalogItem } from '../FoodCatalogItem/FoodCatalogItem';
import styles from './FoodCatalog.module.css';

export const FoodCatalog = () => {
  const activeCategory = useAppSelector((state) => state.categoryReducer.activeCategory);

  return (
    <div className={styles['food-catalog']}>
      <div className={styles['food-catalog__block']}>
        {activeCategory === ''
          ? food_arr.map((item) => {
              return <FoodCatalogItem key={item._id} {...item} />;
            })
          : food_arr
              .filter((item) => item.category === activeCategory)
              .map((item) => {
                return <FoodCatalogItem key={item._id} {...item} />;
              })}
      </div>
    </div>
  );
};
