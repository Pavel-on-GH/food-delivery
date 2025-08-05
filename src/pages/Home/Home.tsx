import styles from './Home.module.css';
import { Header } from '../../components/Header/Header';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
};
