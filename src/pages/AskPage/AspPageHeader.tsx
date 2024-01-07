import { Link } from 'react-router-dom';
import styles from './AskPage.module.css';
import Timer from './Timer';

type AskPageHeaderProps = {
  trueAnswerNumber: number;
  getCorrectAnswer: () => void;
};

const AskPageHeader = ({
  trueAnswerNumber,
  getCorrectAnswer,
}: AskPageHeaderProps) => {
  return (
    <div className={styles.header}>
      <Link
        onMouseDown={() => getCorrectAnswer()}
        to="/"
        className={styles.homeLink}
      >
        <img src="/home-icon.png" alt="Home" />
      </Link>

      <Timer
        trueAnswerNumber={trueAnswerNumber}
        getCorrectAnswer={getCorrectAnswer}
      />
    </div>
  );
};

export default AskPageHeader;
