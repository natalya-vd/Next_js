import { useReducer, useEffect } from 'react';

import { HhData, Tag, Htag, Advantages, Sort, Product } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';

import { sortReducer } from './sort.reducer';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';

export const TopPageComponent = ({ page, firstCategory, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='gray' size='md'>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>{
        sortedProducts && sortedProducts.map(product => (<Product layout key={product._id} product={product} />))}
      </div>

      <div className={styles['hh-title']}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='md'>hh.ru</Tag>
      </div>

      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {
        page.advantages && page.advantages.length > 0 && <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />

        </>
      }

      {
        page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
      }

      <Htag tag='h2'>Получаемые навыки</Htag>
      {
        page.tags.map(tag => <Tag key={tag} size='sm' color='primary'>{tag}</Tag>)
      }
    </div>
  );
};
