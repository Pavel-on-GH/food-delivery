import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Basket } from './pages/Basket/Basket';
import { Footer } from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { LoginPopup } from './components/LoginPopup/LoginPopup';
import { useAppDispatch } from './store/hooks';
import { setTokenFromStorage } from './store/slices/authSlice';
import { loadUserBasket, loadGuestBasketFromStorage } from './store/slices/basketSlice';
import { OrderSuccessPopup } from './components/OrderSuccessPopup/OrderSuccessPopup';

export function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');

    if (tokenFromStorage) {
      dispatch(setTokenFromStorage(tokenFromStorage));
      dispatch(loadUserBasket(tokenFromStorage));
    } else {
      dispatch(loadGuestBasketFromStorage());
    }
  }, [dispatch]);

  return (
    <div className={styles.main}>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showSuccessPopup && <OrderSuccessPopup setShowSuccess={setShowSuccessPopup} />}
      <div className={styles.container}>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket setShowSuccessPopup={setShowSuccessPopup} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
