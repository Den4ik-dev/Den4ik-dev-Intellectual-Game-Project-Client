import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <Link to="/account" className={styles.headerBody}>
        <div className={styles.userIcon}>
          <img src="/user-icon.png" alt="user icon" />
        </div>
        <div className={styles.userLogin}>{user?.login}</div>
      </Link>
    </div>
  );
};

export default Header;
