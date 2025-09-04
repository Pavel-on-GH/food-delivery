import styles from './AuthInput.module.css';
import type { AuthInputProps } from './AuthInput.types';

export const AuthInput = ({
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
  required = true,
  minLength,
}: AuthInputProps) => {
  return (
    <input
      className={styles.input}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      required={required}
      minLength={minLength}
    />
  );
};
