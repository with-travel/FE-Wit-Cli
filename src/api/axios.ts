import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: Config.SERVER_BASEURL,
});

axiosInstance.interceptors.request.use(
  request => {
    console.log('Axios Request:', request);
    return request;
  },
  error => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('Axios Response:', response);
    return response;
  },
  error => {
    console.error('Axios Response Error:', error);
    console.error(error.status);
    return Promise.reject(error);
  },
);
export { axiosInstance };
