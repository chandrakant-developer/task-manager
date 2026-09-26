import { privateApiClient } from './api.client';

export const getListsAPI = () => privateApiClient.get('/lists');

export const createListAPI = (name) => privateApiClient.post('/lists', name);

export const deleteListAPI = (id) => privateApiClient.delete(`/lists/${id}`, id);