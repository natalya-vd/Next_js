import cn from 'classnames';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';

import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import styles from './Rating.module.css';


export const Rating = forwardRef((
  { isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps,
  ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const computeFocus = (rating: number, i: number): number => {
    if (!isEditable) return -1;
    if (!rating && i === 0) return tabIndex ?? 0;
    if (rating === i + 1) return tabIndex ?? 0;
    return -1;
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((el: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={r => ratingArrayRef.current?.push(r)}
        >
          <StarIcon />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) return;

    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) return;

    setRating(i);
  };

  const handleKey = (e: KeyboardEvent<HTMLElement>) => {
    if (!isEditable || !setRating) return;
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      e.preventDefault();
      if (!rating) {
        setRating(1);
      } else {
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        styles.wrapper,
        {
          [styles.error]: error
        }
      )}
      {...props}
    >
      {ratingArray.map((el, i) => (<span key={i}>{el}</span>))}
      {error && <span className={styles['error-message']}>{error.message}</span>}
    </div>
  );
});
