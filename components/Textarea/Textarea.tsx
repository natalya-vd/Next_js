import cn from 'classnames';
import { forwardRef, ForwardedRef } from 'react';

import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';

export const Textarea = forwardRef((
  { className, error, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={cn(styles.textarea__wrapper, className)}>
      <textarea
        ref={ref}
        className={cn(
          styles.textarea,
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
