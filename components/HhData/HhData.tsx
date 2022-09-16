import { Card } from '..';
import RateIcon from './rate.svg';

import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles['count-value']}>{count}</div>
      </Card>

      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles['salary-value']}>{juniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>

        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles['salary-value']}>{middleSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>

        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles['salary-value']}>{seniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
