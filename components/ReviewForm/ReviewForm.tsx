import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

import { Rating, Input, Textarea, Button } from '..';

import { API } from '../../helpers/api';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';

import styles from './ReviewForm.module.css';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(
        styles['review-form'],
        className
      )}
        {...props}
      >
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          className={styles.name}
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          className={styles.title}
          placeholder='Заголовок отзыва'
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          className={styles.description}
          placeholder='Текст отзыва'
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role="alert">
          <div className={styles.success__title}>
            Ваш отзыв отправлен
          </div>
          <p>
            Спасибо, ваш отзыв будет опубликован после проверки
          </p>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            type='button'
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {error && (
        <div className={cn(styles.panel, styles.error)} role="alert">
          Что-то пошло не так, попробуйте обновить страницу.
          <button
            className={styles.close}
            onClick={() => setError(undefined)}
            type='button'
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
