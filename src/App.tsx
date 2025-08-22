import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Basket } from './pages/Basket/Basket';
import { Footer } from './components/Footer/Footer';
import { useState } from 'react';
import { LoginPopup } from './components/LoginPopup/LoginPopup';

export function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.main}>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className={styles.container}>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
