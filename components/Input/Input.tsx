import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

import { InputProps } from './Input.props';
import styles from './Input.module.css';

export const Input = forwardRef((
  { className, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={cn(styles.input__wrapper, className)}>
      <input
        ref={ref}
        className={cn(
          styles.input,
          {
            [styles.error]: error
          }
        )}
        {...props}
      />
      {error && <span className={styles.error__message} role="alert">{error.message}</span>}
    </div>
  );
});
