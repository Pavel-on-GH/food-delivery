import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './LoginPopup.module.css';
import type { LoginProps, AuthMode } from './LoginPopup.types';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../store/slices/authSlice';
import type { RootState, AppDispatch } from '../../store/store';

export const LoginPopup = ({ setShowLogin }: LoginProps) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { loading, token, error } = useSelector((state: RootState) => state.authReducer);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

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

  useEffect(() => {
    if (token) {
      setShowLogin(false);
    }
  }, [token]);

  const closeOnOverlayClick = () => setShowLogin(false);
  const preventClose = (e: React.MouseEvent) => e.stopPropagation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authUser({ mode, data }));
  };

  return (
    <div
      className={styles['login-popup']}
      onClick={closeOnOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-popup-title">
      <form className={styles['login-popup__form']} onClick={preventClose} onSubmit={onSubmit}>
        <h2 className={styles['login-popup__title']} id="login-popup-title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h2>

        <div className={styles['login-popup__inputs']}>
          {mode === 'register' && (
            <input
              className={styles['login-popup__input']}
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Имя"
              type="text"
              required
            />
          )}
          <input
            className={styles['login-popup__input']}
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Почта"
            type="email"
            required
          />
          <input
            className={styles['login-popup__input']}
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Пароль"
            type="password"
            required
            minLength={6}
          />
        </div>

        {error && <p className={styles['login-popup__error']}>{error}</p>}

        <button className={styles['login-popup__login-btn']} type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
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
