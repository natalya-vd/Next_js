import { forwardRef, useRef, useState, ForwardedRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Card, Tag, Rating, Button, Divider, Review, ReviewForm } from '..';
import { declOfNum, priceRu } from '../../helpers/helpers';

import { ProductProps } from './Product.props';
import styles from './Product.module.css';


export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus();
  };

  const variants = {
    visible: {
      height: 'auto',
      opacity: 1,
      overflow: "initial"
    },
    hidden: {
      height: 0,
      opacity: 0,
      overflow: "hidden"
    }
  };

  return (
    <div
      className={className}
      {...props}
      ref={ref}
    >
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>
          {product.title}
        </div>
        <div className={styles.price}>
          <span className='visuallyHidden'>Цена</span>{priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles['old-price']} color="green">
              <span className='visuallyHidden'>Скидка</span>{priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className='visuallyHidden'>Кредит</span>{priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className='visuallyHidden'>Рейтинг {product.reviewAvg ?? product.initialRating}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {
            product.categories.map((category) => <Tag className={styles.category} key={category} color='ghost'>{category}</Tag>)
          }
        </div>
        <div className={styles['price-title']} aria-hidden={true}>цена</div>
        <div className={styles['credit-title']} aria-hidden={true}>в кредит</div>
        <div className={styles['rate-title']}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(item => (
            <div className={styles.characteristics} key={item.name}>
              <span className={styles['characteristics__name']}>
                {item.name}
              </span>
              <span className={styles['characteristics__dots']}></span>
              <span className={styles['characteristics__value']}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className={styles['adv-block']}>
          {product.advantages && (
            <div className={styles.advantages}>
              <p className={styles['adv-title']}>Преимущества</p>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <p className={styles['adv-title']}>Недостатки</p>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button className={styles['btn-detail']} appearance="primary">
            Узнать подробнее
          </Button>
          <Button
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
            aria-expanded={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div
        initial="hidden"
        animate={isReviewOpened ? "visible" : "hidden"}
        variants={variants}
      >
        <Card color='blue' className={styles.reviews}
          ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}
        >
          {
            product.reviews.map(review => (
              <div key={review._id}>
                <Review review={review} />
                <Divider />
              </div>
            ))
          }
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </div>
  );
}));
