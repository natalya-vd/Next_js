import { HhData, Tag, Htag, Advantages } from '../../components';

import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';

export const TopPageComponent = ({ page, firstCategory, products }: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='gray' size='md'>{products.length}</Tag>}
        <div>Сортировка</div>
      </div>
      <div>{
        products && products.map(product => (<div key={product._id}>{product.title}</div>))}
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
