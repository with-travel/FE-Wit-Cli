import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: Config.SERVER_BASEURL,
});

axiosInstance.interceptors.request.use(
  request => {
    console.log('🚀 Axios Request:', {
      method: request.method?.toUpperCase(),
      url: request.url,
      baseURL: request.baseURL,
      fullURL: `${request.baseURL}${request.url}`,
      data: request.data,
    });
    return request;
  },
  error => {
    console.error('❌ Axios Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ Axios Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    console.error('❌ Axios Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      fullURL: `${error.config?.baseURL}${error.config?.url}`,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  },
);
export { axiosInstance };
