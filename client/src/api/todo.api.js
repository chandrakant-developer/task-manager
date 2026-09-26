import { privateApiClient } from './api.client';

export const getTodosAPI = (filter) => privateApiClient.get(`/todos?filter=${filter}`);

export const getTodoCountsAPI = () => privateApiClient.get('/todos/counts');

export const createTodoAPI = (todoData) => privateApiClient.post('/todos', todoData);

export const updateTodoAPI = (id, updates) => privateApiClient.put(`/todos/${id}`, updates);

export const deleteTodoAPI = (id) => privateApiClient.delete(`/todos/${id}`);