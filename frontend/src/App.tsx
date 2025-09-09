import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Basket } from './pages/Basket/Basket';
import { Footer } from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { LoginPopup } from './components/LoginPopup/LoginPopup';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setTokenFromStorage } from './store/slices/authSlice';
import { loadUserBasket, loadGuestBasketFromStorage } from './store/slices/basketSlice';
import axios from 'axios';

export function App() {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.token);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');

    if (tokenFromStorage) {
      dispatch(setTokenFromStorage(tokenFromStorage));
      dispatch(loadUserBasket(tokenFromStorage));
    } else {
      dispatch(loadGuestBasketFromStorage());
    }
  }, [dispatch]);

  useEffect(() => {
    const mergeGuestBasket = async () => {
      const guestBasketRaw = localStorage.getItem('guestBasket');

      if (token && guestBasketRaw) {
        try {
          const guestItems = JSON.parse(guestBasketRaw);

          for (const item of guestItems) {
            for (let i = 0; i < item.count; i++) {
              await axios.post(
                'http://localhost:4000/api/basket/add',
                { itemId: item._id },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
            }
          }

          localStorage.removeItem('guestBasket');
          dispatch(loadUserBasket(token));
        } catch (err) {
          console.error('Ошибка при слиянии корзин:', err);
        }
      }
    };

    mergeGuestBasket();
  }, [token, dispatch]);

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
