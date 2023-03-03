import cn from 'classnames';
import { KeyboardEvent } from 'react';

import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './Sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
  const onKeyBoard = (e: KeyboardEvent<HTMLSpanElement>, sort: SortEnum) => {
    if (e.code == 'Space' || e.code == 'Enter') {
      e.preventDefault();
      setSort(sort);
    }
  };


  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id="sort">Сортировка</div>
      <button
        id="rating"
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })
        }
        onClick={() => setSort(SortEnum.Rating)}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles['sort-icon']} />По рейтингу
      </button>

      <button
        id="price"
        className={cn({
          [styles.active]: sort == SortEnum.Price
        })
        }
        onClick={() => setSort(SortEnum.Price)}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles['sort-icon']} />По цене
      </button>
    </div>
  );
};
