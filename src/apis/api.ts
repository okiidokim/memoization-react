import axios from 'axios';

const api = axios.create({
  baseURL: 'https://picsum.photos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
