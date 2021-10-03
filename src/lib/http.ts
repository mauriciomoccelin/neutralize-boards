/* eslint-disable */
import axios from 'axios';
import url from './url';

const http = axios.create({
  baseURL: url,
  timeout: 30000
});

http.interceptors.request.use(
  function (config) {
    const bearerToken = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + bearerToken;
    config.withCredentials = true;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (respon) => { return respon; },
  (error) => {
    if (!!error.response && !!error.response.data.error) {
      console.error(error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export default http;
