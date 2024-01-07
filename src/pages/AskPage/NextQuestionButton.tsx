import styles from './AskPage.module.css';

type AskPageHeaderProps = {
  loadQuestion: () => void;
};

const NextQuestionButton = ({ loadQuestion }: AskPageHeaderProps) => {
  return (
    <button onClick={() => loadQuestion()} className={styles.nextButton}>
      Следующий вопрос
    </button>
  );
};

export default NextQuestionButton;
