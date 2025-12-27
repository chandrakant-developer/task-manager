import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all todos
export const getTodosAPI = async () => {
  const response = await apiClient.get('/todos');
  return response.data;
};

// POST create todo
export const createTodoAPI = async (todoData) => {
  const response = await apiClient.post('/todos', todoData);
  return response.data;
};

// PUT update todo
export const updateTodoAPI = async (id, updates) => {
  const response = await apiClient.put(`/todos/${id}`, updates);
  return response.data;
};

// DELETE todo
export const deleteTodoAPI = async (id) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};

// Lists API
export const getListsAPI = async (userId = null) => {
  const url = userId ? `/lists?userId=${userId}` : '/lists';
  const response = await apiClient.get(url);
  return response.data;
};

export const createListAPI = async (name, userId = null) => {
  const response = await apiClient.post('/lists', { name, userId });
  return response.data;
};

export const deleteListAPI = async (id, userId = null) => {
  const url = userId ? `/lists/${id}?userId=${userId}` : `/lists/${id}`;
  const response = await apiClient.delete(url);
  return response.data;
};

// Tags API
export const getTagsAPI = async (userId = null) => {
  const url = userId ? `/tags?userId=${userId}` : '/tags';
  const response = await apiClient.get(url);
  return response.data;
};

export const createTagAPI = async (name, userId = null) => {
  const response = await apiClient.post('/tags', { name, userId });
  return response.data;
};

export const deleteTagAPI = async (id, userId = null) => {
  const url = userId ? `/tags/${id}?userId=${userId}` : `/tags/${id}`;
  const response = await apiClient.delete(url);
  return response.data;
};
