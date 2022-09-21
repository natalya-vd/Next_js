import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

import { InputProps } from './Input.props';
import styles from './Input.module.css';

export const Input = forwardRef((
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <input ref={ref} className={cn(styles.input, className)} {...props} />
  );
});
