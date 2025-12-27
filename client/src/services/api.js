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
