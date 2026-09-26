import { privateApiClient } from './api.client';

export const userProfileAPI = () => privateApiClient.get("/user/profile");
