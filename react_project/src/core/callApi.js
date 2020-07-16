import axios from 'axios';

export default (url, method = 'get', data) => {
  if (method === 'put' || method === 'post') {
    return axios[method](`http://localhost:3001/${url}`, data, { headers: { 'Content-Type': 'application/json' } });
  }
  return axios[method](`http://localhost:3001/${url}`, data);
};
