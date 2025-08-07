import styles from './Home.module.css';
import { Header } from '../../components/Header/Header';
import { FoodCategories } from '../../components/FoodCategories/FoodCategories';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <FoodCategories />
    </div>
  );
};
