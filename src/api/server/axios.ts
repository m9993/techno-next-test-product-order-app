import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../config';

const instance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* instance.interceptors.request.use(
  async config => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) flashMessage.danger({ message: 'No internet connection!' });

    const accessToken = await getLocalAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => res,
  async err => {
    if (err.response.status === 401) {
      await AsyncStorage.removeItem('accessToken');
    }
    return err.response;
  },
);
 */
/* 
instance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err?.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;
        try {
          const rs = await getRefreshToken();
          // console.log('rsssss', rs);

          const { accessToken, refreshToken } = rs;
          if (!accessToken && !refreshToken) return Promise.reject(rs);

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);

          return await instance.request(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }

      // Ex: for backend input validations
      if (err.response.status === 400 && err.response.data) {
        flashMessage.warning({ message: err.response.data.message[0] || err.response.data.error });
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  },
);
*/

export const server = instance;

// HELPER FUNCTIONS
async function getLocalAccessToken() {
  const accessToken = await AsyncStorage.getItem('accessToken');
  return accessToken;
}

/* 
async function getLocalRefreshToken() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return refreshToken;
}

async function getRefreshToken() {
  const response = await fetch(config.baseURL + '/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: await getLocalRefreshToken() }),
  });

  return response.json();
}
*/

// HELPER FUNCTIONS
