import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import styles from './AskPage.module.css';
import Answer from './Answer';
import AskPageHeader from './AspPageHeader';
import NextQuestionButton from './NextQuestionButton';

type Question = {
  id: number;
  userId: number;
  categoryQuestionId: number;
  questionContent: string;
  answers: string[];
  imagePath: string;
};

export type ResponseAnswer = {
  isTrue: boolean;
  trueAnswerNumber: number;
};

const AskPage = () => {
  const { categoryId } = useParams();
  const [question, setQuestion] = useState<Question>({
    id: 0,
    userId: 0,
    categoryQuestionId: 0,
    questionContent: '',
    answers: [],
    imagePath: '',
  });

  const refSelectAnswerNumber = useRef<number>(0);
  const [trueAnswerNumber, setTrueAnswerNumber] = useState<number>(0);

  const loadQuestion = () => {
    api
      .post(`/api/users/questions/ask${!categoryId ? '' : `/${categoryId}`}`)
      .then((resp) => setQuestion(resp.data));
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  useEffect(() => {
    setTrueAnswerNumber(0);
    refSelectAnswerNumber.current = 0;
  }, [question]);

  const getCorrectAnswer = () => {
    api
      .post(`/api/users/questions/correct/answer/${question.id}`)
      .then((resp) =>
        setTrueAnswerNumber((resp.data as ResponseAnswer).trueAnswerNumber)
      );
  };

  const answerQuestion = (answerNumber: number): void => {
    refSelectAnswerNumber.current = answerNumber;

    api
      .post('/api/users/questions/answer', {
        userQuestionId: question.id,
        answerNumber: answerNumber,
      })
      .then((resp) =>
        setTrueAnswerNumber((resp.data as ResponseAnswer).trueAnswerNumber)
      );
  };

  return (
    <div className={styles.wrapper}>
      <AskPageHeader
        trueAnswerNumber={trueAnswerNumber}
        getCorrectAnswer={getCorrectAnswer}
      />
      <div className={styles.questionImage}>
        <img src={question.imagePath} alt="question image" />
      </div>
      <div className={styles.question}>{question.questionContent}</div>
      <div>
        {question.answers.map((ans, i) => (
          <Answer
            key={i}
            answerNumber={i + 1}
            content={ans}
            answerQuestion={answerQuestion}
            trueAnswerNumber={trueAnswerNumber}
            selectAnswerNumber={refSelectAnswerNumber.current}
          />
        ))}
      </div>
      {trueAnswerNumber === 0 ? (
        <></>
      ) : (
        <NextQuestionButton loadQuestion={loadQuestion} />
      )}
    </div>
  );
};

export default AskPage;
