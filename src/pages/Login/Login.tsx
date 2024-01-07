import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import api from '../../api/api';
import axios, { AxiosError } from 'axios';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../api/token';

type LoginUser = {
  login: string;
  password: string;
};

const Login = () => {
  const [loginUser, setLoginUser] = useState<LoginUser>({
    login: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const fetchLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/users/login', loginUser);
      if (response.status === 204)
        throw new AxiosError('Вы неправильно указали логин или пароль');

      setError('');

      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        JSON.stringify(response.data)
      );

      location.replace('/');
    } catch (e) {
      if (axios.isAxiosError(e))
        setError(e.response?.data.message || e.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.loginForm} onSubmit={(e) => fetchLogin(e)}>
        <div className={styles.title}>Авторизация</div>

        <div style={{ marginBottom: '10px' }}>
          <div className={styles.inputTitle}>Логин</div>
          <input
            type="text"
            value={loginUser.login}
            onChange={(e) =>
              setLoginUser((prev) => ({
                ...prev,
                login: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <div className={styles.inputTitle}>Пароль</div>
          <input
            type="password"
            value={loginUser.password}
            onChange={(e) =>
              setLoginUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <div className={styles.error}>{error}</div>

        <Link to="/reg" className={styles.link}>
          Регистрация
        </Link>
        <button className={styles.loginButton}>Авторизоваться</button>
      </form>
    </div>
  );
};

export default Login;
