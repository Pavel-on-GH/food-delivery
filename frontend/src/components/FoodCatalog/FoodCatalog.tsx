import { useEffect, useState } from 'react';
import { type FoodListItem } from '../FoodCatalogItem/FoodCatalogItem.types';
import { useAppSelector } from '../../store/hooks';
import { FoodCatalogItem } from '../FoodCatalogItem/FoodCatalogItem';
import styles from './FoodCatalog.module.css';
import axios from 'axios';

export const FoodCatalog = () => {
  const activeCategory = useAppSelector((state) => state.categoryReducer.activeCategory);

  const [foodArr, setFoodArr] = useState<FoodListItem[]>([]);

  useEffect(() => {
    const fetchFoodArr = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/food-arr`);
        setFoodArr(res.data.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchFoodArr();
  }, []);

  return (
    <div className={styles['food-catalog']}>
      <div className={styles['food-catalog__block']}>
        {activeCategory === ''
          ? foodArr.map((item) => <FoodCatalogItem key={item._id} {...item} />)
          : foodArr
              .filter((item) => item.category === activeCategory)
              .map((item) => <FoodCatalogItem key={item._id} {...item} />)}
      </div>
    </div>
  );
};
