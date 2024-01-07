import { Link } from 'react-router-dom';
import styles from './CategoryQuestion.module.css';

export type CategoryQuestionType = {
  id: number;
  title: string;
  imagePath: string;
};

const CategoryQuestion = ({ id, title, imagePath }: CategoryQuestionType) => {
  return (
    <Link to={`ask/${id}`} className={styles.categoryQuestion}>
      <div className={styles.icon}>
        {imagePath ? (
          <img src={imagePath} alt={title} />
        ) : (
          <img src="/science-icon.png" alt={title} />
        )}
      </div>
      <div className={styles.title}>{title}</div>
    </Link>
  );
};

export default CategoryQuestion;
