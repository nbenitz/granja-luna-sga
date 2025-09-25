import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8001', // Apunta al servicio 'backend' en el puerto 8001
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
