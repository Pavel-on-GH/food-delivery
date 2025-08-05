import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <h2 className={styles.header__title}>Закажите любимое блюдо у нас</h2>
        <p className={styles.header__text}>
          Выбирайте из разнообразного меню, включающего в себя восхитительный выбор блюд,
          приготовленных с использованием лучших ингредиентов и кулинарного мастерства.
        </p>
        <button className={styles.header__btn}>Меню</button>
      </div>
    </div>
  );
};
