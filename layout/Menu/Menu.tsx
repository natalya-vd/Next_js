import cn from 'classnames';
import { useContext } from 'react';

import { AppContext } from '../../context/app.context';
import { IFirstLevelMenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

import styles from './Menu.module.css';
import { PageItem } from './../../interfaces/menu.interface';

const firstLevelMenu: IFirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products
  },
];

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(menuFirst => (
          <li key={menuFirst.route}>
            <a href={`/${menuFirst.route}`}>
              <span className={cn(
                styles.firstLevel,
                {
                  [styles.firstLevelActive]: menuFirst.id == firstCategory
                }
              )}>
                {menuFirst.icon}
                <span>{menuFirst.name}</span>
              </span>
            </a>
            {menuFirst.id == firstCategory && buildSecondLevel(menuFirst)}
          </li>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(item => (
          <li key={item._id.secondCategory}>
            <div className={styles.secondLevel}>
              {item._id.secondCategory}
            </div>
            <ul className={cn(
              styles.secondLevelBlock,
              {
                [styles.secondLevelBlockOpened]: item.isOpened
              }
            )}>
              {buildThirdLevel(item.pages, menuItem.route)}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(page => (
        <li key={page.alias}>
          <a href={`/${route}/${page.alias}`} className={cn(
            styles.thirdLevel,
            {
              [styles.thirdLevelActive]: false
            }
          )}>
            {page.category}
          </a>
        </li>
      ))
    );
  };

  return (
    <nav className={styles.menu}>
      <ul>
        {buildFirstLevel()}
      </ul>
    </nav>
  );
};
