import styles from './Home.module.css';
import { Header } from '../../components/Header/Header';
import { FoodCategories } from '../../components/FoodCategories/FoodCategories';
import { FoodCatalog } from '../../components/FoodCatalog/FoodCatalog';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <FoodCategories />
      <FoodCatalog />
    </div>
  );
};
