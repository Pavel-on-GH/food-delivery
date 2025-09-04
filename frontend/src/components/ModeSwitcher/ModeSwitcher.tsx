import type { AuthMode } from '../LoginPopup/LoginPopup.types';

interface ModeSwitcherProps {
  mode: AuthMode;
  onSwitch: (mode: AuthMode) => void;
  className?: string;
}

export const ModeSwitcher = ({ mode, onSwitch, className }: ModeSwitcherProps) => {
  return (
    <p>
      {mode === 'login' ? 'Ещё не зарегистрирован? ' : 'Уже есть аккаунт? '}
      <button
        type="button"
        className={className}
        onClick={() => onSwitch(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Создай аккаунт!' : 'Входи!'}
      </button>
    </p>
  );
};
