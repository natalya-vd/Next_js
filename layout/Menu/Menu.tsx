import cn from 'classnames';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { AppContext } from '../../context/app.context';

import { IFirstLevelMenuItem } from '../../interfaces/menu.interface';
import { PageItem } from './../../interfaces/menu.interface';

import { firstLevelMenu } from '../../helpers/helpers';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29
    },
    hidden: {
      opacity: 0,
      height: 0
    }
  };

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
              <motion.ul
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={cn(
                  styles.secondLevelBlock
                )}>
                {buildThirdLevel(item.pages, menuItem.route)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(page => (
        <motion.li
          key={page.alias}
          variants={variantsChildren}
        >
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
        </motion.li>
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
