import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

import { AppContext } from '../../context/app.context';

import { IFirstLevelMenuItem } from '../../interfaces/menu.interface';
import { PageItem } from './../../interfaces/menu.interface';

import { firstLevelMenu } from '../../helpers/helpers';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
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
      minHeight: 29,
      height: 'auto'
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      minHeight: 0,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === secondCategory) {
        setAnnounce(item.isOpened ? 'closed' : 'opened');
        item.isOpened = !item.isOpened;
      }
      return item;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul>
        {firstLevelMenu.map(menuFirst => (
          <li key={menuFirst.route} aria-expanded={menuFirst.id == firstCategory}>
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
      </ul>
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
            <li key={item._id.secondCategory} >
              <button
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
                aria-expanded={item.isOpened}
              >
                {item._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={cn(
                  styles.secondLevelBlock
                )}>
                {buildThirdLevel(item.pages, menuItem.route, item.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(page => (
        <motion.li
          key={page._id}
          variants={variantsChildren}
        >
          <Link href={`/${route}/${page.alias}`}>
            <a
              tabIndex={isOpened ? 0 : -1}
              className={cn(
                styles.thirdLevel,
                {
                  [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                }
              )}
              aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
            >
              {page.category}
            </a>
          </Link>
        </motion.li>
      ))
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span className='visualyHidden' role="log">
          {announce == 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
