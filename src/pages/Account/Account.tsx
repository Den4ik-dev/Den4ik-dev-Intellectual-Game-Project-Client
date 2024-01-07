import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Account.module.css';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Account = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link to="/" className={styles.homeLink}>
          <img src="/home-icon.png" alt="home" />
        </Link>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.userIcon}>
          <img src="/user-icon.png" alt="user icon" />
        </div>
        <div className={styles.userLogin}>{user?.login}</div>
      </div>

      <ProgressBar />
    </div>
  );
};

export default Account;
