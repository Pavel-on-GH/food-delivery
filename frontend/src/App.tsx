import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Basket } from './pages/Basket/Basket';
import { Footer } from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { LoginPopup } from './components/LoginPopup/LoginPopup';
import { useDispatch } from 'react-redux';
import { setTokenFromStorage } from './store/slices/authSlice';
import type { AppDispatch } from './store/store';

export function App() {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setTokenFromStorage(token));
    }
  }, [dispatch]);

  return (
    <div className={styles.main}>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className={styles.container}>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
