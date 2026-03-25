import axios from 'axios';
import store from '../store/store';
import { clearUser } from '../store/slices/auth.slice';

const API_BASE_URL = 'http://localhost:5001/api';

export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

export const privateApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

privateApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;
    
    if (
      error.response?.status === 401 &&
      !url.includes("/auth/login") &&
      !url.includes("/user")
    ) {
      store.dispatch(clearUser());
    }

    return Promise.reject(error);
  }
);

// Auth API
export const registerAPI = async ({ name, email, password }) => {
  const response = await publicApiClient.post('/auth/register', { name, email, password });
  return response.data;
};

export const loginAPI = async ({ email, password }) => {
  const response = await publicApiClient.post('/auth/login', { email, password });
  return response.data;
};

export const userAPI = async () => {
  const response = await privateApiClient.get('/user');
  return response.data;
};

// Todos API
export const getTodosAPI = async (userId) => {
  const response = await privateApiClient.get("/todos", { 
    params: userId ? { userId } : {},
  });
  return response.data;
};

export const createTodoAPI = async (todoData) => {
  const response = await privateApiClient.post('/todos', todoData);
  return response.data;
};

export const updateTodoAPI = async (id, updates) => {
  const response = await privateApiClient.put(`/todos/${id}`, updates);
  return response.data;
};

export const deleteTodoAPI = async (id) => {
  const response = await privateApiClient.delete(`/todos/${id}`);
  return response.data;
};

// Lists API
export const getListsAPI = async (userId = null) => {
  const response = await privateApiClient.get('/lists', {
    params: userId ? { userId } : {},
  });
  return response.data;
};

export const createListAPI = async (name, userId = null) => {
  const response = await privateApiClient.post('/lists', { name, userId });
  return response.data;
};

export const deleteListAPI = async (id, userId = null) => {
  const url = userId ? `/lists/${id}?userId=${userId}` : `/lists/${id}`;
  const response = await privateApiClient.delete(url);
  return response.data;
};

// Tags API
export const getTagsAPI = async (userId = null) => {
  const url = userId ? `/tags?userId=${userId}` : '/tags';
  const response = await privateApiClient.get(url);
  return response.data;
};

export const createTagAPI = async (name, userId = null) => {
  const response = await privateApiClient.post('/tags', { name, userId });
  return response.data;
};

export const deleteTagAPI = async (id, userId = null) => {
  const response = await privateApiClient.delete(`/tags/${id}`, {
    params: userId ? { userId } : {},
  });
  return response.data;
};