import { privateApiClient } from './api.client';

export const getTagsAPI = () => privateApiClient.get('/tags');

export const createTagAPI = (name) => privateApiClient.post('/tags', name);

export const deleteTagAPI = (id) => privateApiClient.delete(`/tags/${id}`, id);