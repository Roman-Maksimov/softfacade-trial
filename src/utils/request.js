import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://api.stackexchange.com/2.2/',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  response => response.data,
  (error) => {
    console.error(error); // eslint-disable-line no-console
    return Promise.reject(error);
  },
);

export default http;
