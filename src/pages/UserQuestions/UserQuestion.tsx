import { Link } from 'react-router-dom';
import { UserQuestionType } from './UserQuestions';
import styles from './UserQuestions.module.css';

type UserQuestionProps = {
  userQuestion: UserQuestionType;
};

const UserQuestion = ({ userQuestion }: UserQuestionProps) => {
  return (
    <Link
      to={`/user/questions/${userQuestion.id}`}
      className={styles.userQuestion}
    >
      <div className={styles.userQuestionIcon}>
        <img
          src={
            userQuestion.complete
              ? '/answer/correct-icon.png'
              : userQuestion.answerNumber == 0
              ? '/answer/time-is-up-icon.png'
              : '/answer/cross-icon.png'
          }
          alt={
            userQuestion.complete
              ? 'completed'
              : userQuestion.answerNumber == 0
              ? 'time is up'
              : 'cross'
          }
        />
      </div>
      <div className={styles.userQuestionContent}>
        {userQuestion.questionContent}
      </div>
    </Link>
  );
};

export default UserQuestion;
