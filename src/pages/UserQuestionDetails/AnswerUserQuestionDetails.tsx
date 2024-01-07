import styles from './UserQuestionDetails.module.css';

type AnswerUserQuestionDetailsProps = {
  selectAnswerNumber: number;
  trueAnswerNumber: number;
  answerNumber: number;
  answer: string;
};

const AnswerUserQuestionDetails = ({
  selectAnswerNumber,
  trueAnswerNumber,
  answerNumber,
  answer,
}: AnswerUserQuestionDetailsProps) => {
  return (
    <div className={styles.answer}>
      <div className={styles.answerBody}>
        <div className={styles.answerNumber}>{answerNumber}</div>
        <div className={styles.answerContent}>{answer}</div>
      </div>
      <div className={styles.answerCorrect}>
        <div>
          <img
            src={
              answerNumber == trueAnswerNumber
                ? '/answer/correct-icon.png'
                : answerNumber == selectAnswerNumber
                ? '/answer/cross-icon.png'
                : ''
            }
            alt={
              answerNumber == trueAnswerNumber
                ? 'correct'
                : answerNumber == selectAnswerNumber
                ? 'cross'
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerUserQuestionDetails;
