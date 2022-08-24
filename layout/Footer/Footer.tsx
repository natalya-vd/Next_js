import cn from 'classnames';
import { format } from 'date-fns';

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import { Ptag } from '../../components';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer
      className={cn(
        className, styles.wrapper
      )}
      {...props}>
      <Ptag>
        OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
      </Ptag>
      <a href="#" target='_blank'>
        Пользовательское соглашение
      </a>
      <a href="#" target='_blank'>
        Политика конфиденциальности
      </a>
    </footer>
  );
};
