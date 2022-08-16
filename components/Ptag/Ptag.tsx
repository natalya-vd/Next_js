import cn from 'classnames';

import { PtagProps } from './Ptag.props';
import styles from './Ptag.module.css';

export const Ptag = ({ children, size = 'md', className, ...props }: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.text, className, {
        [styles.lg]: size === 'lg',
        [styles.md]: size === 'md',
        [styles.sm]: size === 'sm',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
