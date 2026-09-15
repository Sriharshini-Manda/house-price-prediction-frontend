import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const getMetadata = async () => {
  const response = await api.get('/metadata');
  return response.data;
};

export const predictPrice = async (features) => {
  const response = await api.post('/predict', features);
  return response.data;
};

export const getHistory = async (params = {}) => {
  const response = await api.get('/history', { params });
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export default api;
