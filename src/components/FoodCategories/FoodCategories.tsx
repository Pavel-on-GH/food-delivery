import styles from './FoodCategories.module.css';
import { categories_list } from '../../assets/images';
import { useState } from 'react';

export const FoodCategories = () => {
  const [activeCategory, setActiveCategory] = useState(categories_list[0].title);

  // Функция выбора активной категории
  function changeActiveCategory(title: string) {
    return `${styles['categories__item-img']} ${
      activeCategory === title ? styles['categories__item-img_active'] : ''
    }`;
  }

  return (
    <div className={styles.categories}>
      <h1 className={styles['categories__title']}>Меню</h1>
      <p className={styles['categories__description']}>
        Из множества вкусных блюд нашего разнообразного меню найдётся что-то по душе каждому. Наша
        задача - подарить вам удовольствие от каждого укуса и сделать ваш обед или ужин
        по-настоящему незабываемым.
      </p>
      <div className={styles['categories__list']}>
        {categories_list.map((item, index) => (
          <div
            onClick={() => setActiveCategory(item.title)}
            className={styles['categories__item']}
            key={index}>
            <img
              src={item.image}
              className={changeActiveCategory(item.title)}
              alt={`Картинка: ${item.title}`}
            />
            <h2 className={styles['categories__item-title']}>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
