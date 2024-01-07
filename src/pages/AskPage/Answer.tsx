import { useEffect, useState } from 'react';
import styles from './AskPage.module.css';

type AnswerProps = {
  answerNumber: number;
  content: string;
  answerQuestion: (answerNumber: number) => void;
  trueAnswerNumber: number;
  selectAnswerNumber: number;
};

const Answer = ({
  answerNumber,
  content,
  answerQuestion,
  trueAnswerNumber,
  selectAnswerNumber,
}: AnswerProps) => {
  const [isTrue, setIsTrue] = useState<boolean>(false);

  useEffect(() => {
    if (trueAnswerNumber === 0) {
      setIsTrue(false);
    }

    if (trueAnswerNumber == answerNumber) {
      setIsTrue(true);
    }
  }, [trueAnswerNumber]);

  useEffect(() => {
    if (selectAnswerNumber === 0) setIsTrue(false);
  }, [selectAnswerNumber]);

  return (
    <button
      className={styles.answer}
      onClick={() => answerQuestion(answerNumber)}
    >
      <div className={styles.answerBody}>
        <div className={styles.answerNumber}>{answerNumber}</div>
        <div className={styles.answerContent}>{content}</div>
      </div>
      <div className={styles.answerCorrect}>
        {isTrue ? (
          <div>
            <img src="/answer/correct-icon.png" alt="correct" />
          </div>
        ) : !isTrue && selectAnswerNumber === answerNumber ? (
          <div>
            <img src="/answer/cross-icon.png" alt="cross" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default Answer;
