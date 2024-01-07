import { useEffect, useRef, useState } from 'react';
import styles from './UserQuestions.module.css';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import UserQuestion from './UserQuestion';

export type UserQuestionType = {
  id: number;
  userId: number;
  categoryQuestionId: number;
  questionId: number;
  questionContent: string;
  complete: boolean;
  answerNumber: number;
};

const UserQuestions = () => {
  const [userQuestions, setUserQuestions] = useState<UserQuestionType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);
  const refTotalCount = useRef<number>(0);

  useEffect(() => {
    if (fetching) {
      api
        .get(`/api/users/questions?limit=15&page=${currentPage}`)
        .then((resp) => {
          setUserQuestions([...userQuestions, ...resp.data]);
          setCurrentPage(currentPage + 1);
          refTotalCount.current = resp.headers['x-total-count'] as number;
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = (e: Event) => {
    const document = e.target as Document;

    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      userQuestions.length < refTotalCount.current
    ) {
      setFetching(true);
    }
  };

  return (
    <div className={styles.wrapper} onScroll={(e) => {}}>
      <div className={styles.header}>
        <Link to="/account" className={styles.headerBackButton}>
          <img src="/back-icon.png" alt="back" />
        </Link>
      </div>
      <div className={styles.main}>
        {userQuestions.length > 0 ? (
          userQuestions.map((uq) => (
            <UserQuestion userQuestion={uq} key={uq.id} />
          ))
        ) : (
          <div style={{ color: '#fff', fontSize: '20px', marginTop: '30px' }}>
            Пока что вы не ответили ни на один вопрос...
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuestions;
