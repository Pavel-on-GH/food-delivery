import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Basket } from './pages/Basket/Basket';

export function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}
