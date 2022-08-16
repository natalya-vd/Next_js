import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none'
}

// DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
// В DetailedHTMLProps передаем 2 типа: первый - какой-то HTMLAttributes (либо специальный,если есть, либо HTMLAttributes), второй - HTMLElement (то же либо специальный, либо HTMLElement)
