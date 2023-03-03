import cn from 'classnames';
import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import GlassIcon from './glass.svg';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      goToSearch();
    }
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <GlassIcon />
      </Button>
    </div >
  );
};
