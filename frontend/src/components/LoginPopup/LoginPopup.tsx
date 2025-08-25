import { useEffect, useState } from 'react';
import styles from './LoginPopup.module.css';

type LoginProps = {
  setShowLogin: (showLogin: boolean) => void;
};

type AuthMode = 'login' | 'register';

export const LoginPopup = ({ setShowLogin }: LoginProps) => {
  const [mode, setMode] = useState<AuthMode>('login');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLogin(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const closeOnOverlayClick = () => setShowLogin(false);
  const preventClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={styles['login-popup']}
      onClick={closeOnOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-popup-title">
      <form className={styles['login-popup__form']} onClick={preventClose} onSubmit={handleSubmit}>
        <h2 className={styles['login-popup__title']} id="login-popup-title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h2>

        <div className={styles['login-popup__inputs']}>
          {mode === 'register' && (
            <input
              className={styles['login-popup__input']}
              placeholder="Имя"
              type="text"
              required
            />
          )}
          <input
            className={styles['login-popup__input']}
            placeholder="Почта"
            type="email"
            required
          />
          <input
            className={styles['login-popup__input']}
            placeholder="Пароль"
            type="password"
            required
            minLength={6}
          />
        </div>

        <button
          onClick={() => setShowLogin(false)}
          className={styles['login-popup__login-btn']}
          type="submit">
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <button
          type="button"
          className={styles['login-popup__close-btn']}
          onClick={() => setShowLogin(false)}
          aria-label="Закрыть окно">
          Х
        </button>

        {mode === 'login' ? (
          <p>
            {`Ещё не зарегистрирован? `}
            <button
              type="button"
              className={styles['login-popup__switch-btn']}
              onClick={() => setMode('register')}>
              Создай аккаунт!
            </button>
          </p>
        ) : (
          <p>
            {`Уже есть аккаунт? `}
            <button
              type="button"
              className={styles['login-popup__switch-btn']}
              onClick={() => setMode('login')}>
              Входи!
            </button>
          </p>
        )}
      </form>
    </div>
  );
};
