import cn from 'classnames';
import Image from 'next/image';

import { Card, Tag, Rating, Button, Divider } from '..';

import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { declOfNum, priceRu } from '../../helpers/helpers';

export const Product = ({ product }: ProductProps): JSX.Element => {
  return (
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
        {priceRu(product.price)}
        {product.oldPrice && <Tag className={styles['old-price']} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
      </div>
      <div className={styles.credit}>
        {priceRu(product.credit)}/<span className={styles.month}>мес</span>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {
          product.categories.map((category) => <Tag className={styles.category} key={category} color='ghost'>{category}</Tag>)
        }
      </div>
      <div className={styles['price-title']}>цена</div>
      <div className={styles['credit-title']}>в кредит</div>
      <div className={styles['rate-title']}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
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
        <Button className={styles['btn-detail']} appearance="primary">Узнать подробнее</Button>
        <Button appearance="ghost" arrow={'right'}>Читать отзывы</Button>
      </div>
    </Card>
  );
};
