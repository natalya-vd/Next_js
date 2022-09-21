import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { Rating, Input, Textarea, Button } from '..';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm } from './ReviewForm.interface';

import styles from './ReviewForm.module.css';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

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
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          className={styles.name}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          className={styles.title}
          placeholder='Заголовок отзыва'
          error={errors.title}
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
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          className={styles.description}
          placeholder='Текст отзыва'
          error={errors.description}
        />
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
