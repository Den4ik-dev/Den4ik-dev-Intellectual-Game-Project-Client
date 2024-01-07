import { useEffect, useState } from 'react';
import styles from './Account.module.css';
import { Link } from 'react-router-dom';
import api from '../../api/api';

type UserStatistics = {
  countOfUserQuestions: number;
  countOfCorrectUserQuestions: number;
};

const ProgressBar = () => {
  const [statistics, setStatistics] = useState<number>();

  useEffect(() => {
    api.get('/api/users/statistics').then((resp) => {
      let {
        countOfCorrectUserQuestions,
        countOfUserQuestions,
      }: UserStatistics = resp.data;

      setStatistics(
        Math.round((countOfCorrectUserQuestions / countOfUserQuestions) * 100)
      );
    });
  }, []);

  return (
    <Link to="/user/questions" className={styles.progressBar}>
      <div
        className={styles.progressBarLine}
        style={{
          width: `${statistics}%`,
        }}
      >
        <div className={styles.statistics}>
          {Number.isNaN(statistics) ? 'Пока нет статистики' : `${statistics}%`}
        </div>
      </div>
    </Link>
  );
};

export default ProgressBar;
