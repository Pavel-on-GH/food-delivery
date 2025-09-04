import type { ChangeEvent } from 'react';

export interface AuthInputProps {
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  className: string;
}
