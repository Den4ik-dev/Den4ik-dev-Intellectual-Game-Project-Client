import axios, { AxiosInstance } from 'axios';
import { LOCAL_STORAGE_TOKEN_NAME, Token } from './token';

export const API_URL: string = 'https://localhost:7104';

const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token: Token = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)!
  ) as Token;
  config.headers.Authorization = `Bearer ${token?.accessToken}`;

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const token: Token = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)!
        ) as Token;

        const response = await api.post('/api/tokens/refresh', token);

        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          JSON.stringify(response.data)
        );

        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default api;
