import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  //baseURL: 'http://3.106.253.108:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
