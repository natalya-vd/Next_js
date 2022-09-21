import cn from 'classnames';
import { forwardRef, ForwardedRef } from 'react';

import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';

export const Textarea = forwardRef((
  { className, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <textarea ref={ref} className={cn(styles.textarea, className)} {...props} />
  );
});
