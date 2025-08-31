const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

const queryKeys = {
  AUTH: 'auth',
  GET_USER_INFO: 'getUserInfo',
} as const;

export { storageKeys, queryKeys };
