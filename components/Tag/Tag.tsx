import cn from 'classnames';

import { TagProps } from './Tag.props';
import styles from './Tag.module.css';

export const Tag = ({ children, size = 'sm', color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.md]: size === 'md',
        [styles.sm]: size === 'sm',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.gray]: color === 'gray',
        [styles.green]: color === 'green',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {
        href
          ? <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};
