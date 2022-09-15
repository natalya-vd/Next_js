import cn from 'classnames';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppContext } from '../../context/app.context';

import { IFirstLevelMenuItem } from '../../interfaces/menu.interface';
import { PageItem } from './../../interfaces/menu.interface';

import { firstLevelMenu } from '../../helpers/helpers';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === secondCategory) {
        item.isOpened = !item.isOpened;
      }
      return item;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(menuFirst => (
          <li key={menuFirst.route}>
            <Link href={`/${menuFirst.route}`}>
              <a>
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
            </Link>
            {menuFirst.id == firstCategory && buildSecondLevel(menuFirst)}
          </li>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(item => {
          if (item.pages.map((page) => page.alias).includes(router.asPath.split('/')[2])) {
            item.isOpened = true;
          }
          return (
            <li key={item._id.secondCategory}>
              <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>
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
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(page => (
        <li key={page.alias}>
          <Link href={`/${route}/${page.alias}`}>
            <a className={cn(
              styles.thirdLevel,
              {
                [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
              }
            )}>
              {page.category}
            </a>
          </Link>
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
