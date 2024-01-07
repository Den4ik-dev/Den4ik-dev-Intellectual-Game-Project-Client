import { Link, useParams } from 'react-router-dom';
import styles from './UserQuestionDetails.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import AnswerUserQuestionDetails from './AnswerUserQuestionDetails';

type UserQuestionDetailsType = {
  imagePath: string;
  questionContent: string;
  answers: string[];
  answerNumber: number;
  trueAnswerNumber: number;
};

const UserQuestionDetails = () => {
  const { userQuestionId } = useParams();
  const [userQuestionDetails, setUserQuestionDetails] =
    useState<UserQuestionDetailsType>();

  useEffect(() => {
    api
      .get(`/api/users/questions/${userQuestionId}`)
      .then((resp) => setUserQuestionDetails(resp.data));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link to="/user/questions" className={styles.headerBackButton}>
          <img src="/back-icon.png" alt="Back" />
        </Link>

        {userQuestionDetails?.answerNumber == 0 ? (
          <div className={styles.headerTimeIsUp}>
            <div className={styles.headerTimeIsUpIcon}>
              <img src="/answer/time-is-up-icon.png" alt="время истекло" />
            </div>
            <div className={styles.headerTimeIsUpSubtitle}>время истекло</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.userQuestionImage}>
        <img src={userQuestionDetails?.imagePath} alt="image question" />
      </div>
      <div className={styles.userQuestionContent}>
        {userQuestionDetails?.questionContent}
      </div>
      <div>
        {userQuestionDetails?.answers.map((answer, i) => (
          <AnswerUserQuestionDetails
            answer={answer}
            answerNumber={i + 1}
            trueAnswerNumber={userQuestionDetails.trueAnswerNumber}
            selectAnswerNumber={userQuestionDetails.answerNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default UserQuestionDetails;
