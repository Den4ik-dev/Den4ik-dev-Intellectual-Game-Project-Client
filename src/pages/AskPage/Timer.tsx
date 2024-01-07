import React, { useEffect, useState } from 'react';
import styles from './AskPage.module.css';

type TimerProps = {
  trueAnswerNumber: number;
  getCorrectAnswer: () => void;
};

const Timer = ({ trueAnswerNumber, getCorrectAnswer }: TimerProps) => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (trueAnswerNumber !== 0) return;
    if (counter === 0) return;

    const timer = setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter, trueAnswerNumber]);

  useEffect(() => {
    if (counter === 0) {
      console.log('hey hey');
      getCorrectAnswer();
      return;
    }
  }, [counter]);

  useEffect(() => {
    if (trueAnswerNumber === 0) setCounter(60);
  }, [trueAnswerNumber]);

  return (
    <div className={styles.counter}>
      <div>{counter}</div>
    </div>
  );
};

export default React.memo(Timer);
