import { Link } from 'react-router-dom';
import styles from './AuthRequirement.module.css';

const AuthRequirement = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>Требуется вход в аккаунт</div>
        <div>
          <Link to="/login" className={`${styles.link} ${styles.authLink}`}>
            Авторизация
          </Link>
          <Link to="/reg" className={`${styles.link} ${styles.regLink}`}>
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthRequirement;
