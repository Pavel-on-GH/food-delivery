import styles from './FoodCategories.module.css';
import { categories_list } from '../../assets/images';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveCategory } from '../../store/slices/categorySlice';

export const FoodCategories = () => {
  const activeCategory = useAppSelector((state) => state.categoryReducer.activeCategory);
  const dispatch = useAppDispatch();

  const changeActiveCategory = (title: string) =>
    `${styles['categories__item-img']} ${
      activeCategory === title ? styles['categories__item-img_active'] : ''
    }`;

  const onCategoryClick = (title: string) =>
    dispatch(setActiveCategory(activeCategory === title ? '' : title));

  return (
    <div className={styles.categories}>
      <h1 className={styles['categories__title']}>Меню</h1>
      <div className={styles['categories__text']}>
        <p className={styles['categories__description']}>
          Из множества вкусных блюд нашего разнообразного меню найдётся что-то по душе каждому.
        </p>
        <p className={styles['categories__description']}>
          Наша задача - подарить вам удовольствие от каждого укуса и сделать ваш обед или ужин
          по-настоящему незабываемым.
        </p>
      </div>

      <div className={styles['categories__list']}>
        {categories_list.map((item) => (
          <div
            key={item.title}
            onClick={() => onCategoryClick(item.title)}
            className={styles['categories__item']}>
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
