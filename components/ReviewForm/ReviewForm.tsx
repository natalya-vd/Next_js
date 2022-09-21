import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { Rating, Input, Textarea, Button } from '..';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm } from './ReviewForm.interface';

import styles from './ReviewForm.module.css';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(
        styles['review-form'],
        className
      )}
        {...props}
      >
        <Input {...register('name')} className={styles.name} placeholder='Имя' />
        <Input {...register('title')} className={styles.title} placeholder='Заголовок отзыва' />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
              />
            )}
          />
        </div>
        <Textarea {...register('description')} className={styles.description} placeholder='Текст отзыва' />
        <div className={styles.submit}>
          <Button appearance='primary' >Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.success__title}>
          Ваш отзыв отправлен
        </div>
        <p>
          Спасибо, ваш отзыв будет опубликован после проверки
        </p>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  );
};
