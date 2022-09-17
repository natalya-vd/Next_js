import { Ptag } from '..';

import CheckIcon from './check.svg';
import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';


export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {
        advantages.map((item) => {
          return (
            <div className={styles.inner} key={item._id}>
              <CheckIcon />
              <p className={styles.title}>{item.title}</p>
              <hr className={styles.vline} />
              <Ptag className={styles.text}>{item.description}</Ptag>
            </div>
          );
        })
      }
    </div>
  );
};
