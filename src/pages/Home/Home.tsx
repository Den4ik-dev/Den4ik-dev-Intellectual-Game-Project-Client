import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Home.module.css';
import AuthRequirement from '../AuthRequirement/AuthRequirement';
import Header from '../../components/Header/Header';
import CategoryQuestion, {
  CategoryQuestionType,
} from '../../components/CategoryQuestion/CategoryQuestion';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [categoriesQuestions, setCategoriesQuestions] = useState<
    CategoryQuestionType[]
  >([]);

  useEffect(() => {
    api.get('/api/questions/categories/all').then((resp) => {
      setCategoriesQuestions(resp.data);
    });
  }, []);

  return user?.isLogin ? (
    <div className={styles.wrapper}>
      <Header />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'auto',
          justifyContent: 'center',
        }}
      >
        {categoriesQuestions.map((cq) => (
          <CategoryQuestion {...cq} key={cq.id} />
        ))}
      </div>

      <div className={styles.footer}>
        <Link to={`ask`} className={styles.mainBtn}>
          Случайный выбор
        </Link>
      </div>
    </div>
  ) : (
    <AuthRequirement />
  );
};

export default Home;
