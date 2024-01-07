import { ReactNode, createContext, useEffect, useState } from 'react';
import { LOCAL_STORAGE_TOKEN_NAME } from '../api/token';
import api from '../api/api';

type StateType = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<StateType>({});

type UserInfo = {
  login: string;
};

type User = {
  isLogin: boolean;
  login: string;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ isLogin: false, login: '' });

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) return;

    api
      .get('/api/users')
      .then((response) =>
        setUser({ ...(response.data as UserInfo), isLogin: true })
      );
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
