import { Link, useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../api/api';
import axios from 'axios';

type RegUser = {
  login: string;
  password: string;
};

const Registration = () => {
  const [regUser, setRegUser] = useState<RegUser>({
    login: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    if (confirmPassword !== regUser.password) setError('Пароли не совпадают');
    else setError('');
  }, [regUser.password, confirmPassword]);

  const nav = useNavigate();

  const fetchRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmPassword !== regUser.password) return;

    try {
      await api.post('/api/users/reg', regUser);
      nav('/login');
    } catch (e) {
      if (axios.isAxiosError(e))
        setError(e.response?.data.message || e.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.regForm} onSubmit={(e) => fetchRegistration(e)}>
        <div className={styles.title}>Регистрация</div>

        <div style={{ marginBottom: '15px' }}>
          <div className={styles.inputTitle}>Логин</div>
          <input
            type="text"
            value={regUser.login}
            onChange={(e) =>
              setRegUser((prev) => ({
                ...prev,
                login: e.target.value,
              }))
            }
          />
        </div>

        <div style={{ marginBottom: '5px' }}>
          <div className={styles.inputTitle}>Пароль</div>
          <input
            type="password"
            value={regUser.password}
            onChange={(e) =>
              setRegUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <div>
          <div className={styles.inputTitle}>Повторить пароль</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={styles.error}>{error}</div>

        <Link to="/login" className={styles.link}>
          Авторизация
        </Link>
        <button className={styles.loginButton}>Зарегестрироваться</button>
      </form>
    </div>
  );
};

export default Registration;
