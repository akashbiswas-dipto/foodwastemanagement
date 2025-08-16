import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.252.146.252:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
