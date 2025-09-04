import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './LoginPopup.module.css';
import type { LoginProps, AuthMode } from './LoginPopup.types';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../store/slices/authSlice';
import type { RootState, AppDispatch } from '../../store/store';
import { AuthInput } from '../AuthInput/AuthInput';
import { ModeSwitcher } from '../ModeSwitcher/ModeSwitcher';
import { useEscapeClose } from '../../hooks/useEscapeClose';

export const LoginPopup = ({ setShowLogin }: LoginProps) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { loading, token, error } = useSelector((state: RootState) => state.authReducer);

  useEscapeClose(() => setShowLogin(false));

  useEffect(() => {
    if (token) {
      setShowLogin(false);
    }
  }, [token]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authUser({ mode, data }));
  };

  return (
    <div
      className={styles['login-popup']}
      onClick={() => setShowLogin(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-popup-title">
      <form
        className={styles['login-popup__form']}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}>
        <h2 className={styles['login-popup__title']} id="login-popup-title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h2>

        <div className={styles['login-popup__inputs']}>
          {mode === 'register' && (
            <AuthInput
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Имя"
              type="text"
              className={styles['login-popup__input']}
              required
            />
          )}
          <AuthInput
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Почта"
            type="email"
            className={styles['login-popup__input']}
            required
          />
          <AuthInput
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Пароль"
            type="password"
            className={styles['login-popup__input']}
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

        <ModeSwitcher
          mode={mode}
          onSwitch={setMode}
          className={styles['login-popup__switch-btn']}
        />
      </form>
    </div>
  );
};
