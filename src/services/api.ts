import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Access-Control-Allow-Origin': '*' },
});
