export const LOCAL_STORAGE_TOKEN_NAME: string = 'auth-token';

export type Token = {
  accessToken: string;
  refreshToken: string;
};
