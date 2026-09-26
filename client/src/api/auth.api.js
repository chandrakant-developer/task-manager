import { publicApiClient, privateApiClient } from './api.client';

export const registerAPI = (userData) => publicApiClient.post("/auth/register", userData);

export const loginAPI = (userData) => publicApiClient.post("/auth/login", userData);

export const refreshTokenAPI = () => publicApiClient.post("/auth/refresh");

export const logoutAPI = () => publicApiClient.post("/auth/logout");

export const passwordChangeAPI = (data) => privateApiClient.put("/auth/password", data);