import * as authApi from "../api/auth.api";

export const registerService = async ({ name, email, password }) => {
    const response = await authApi.registerAPI({ name, email, password });
    return response.data;
};

export const loginService = async ({ email, password }) => {
    const response = await authApi.loginAPI({ email, password });
    return response.data;
};

export const refreshTokenService = async () => {
    const res = await authApi.refreshTokenAPI();
    return res.data;
};

export const logoutService = async () => {
    const response = await authApi.logoutAPI();
    return response.data;
};

export const passwordChangeService = async ({ currentPassword, newPassword }) => {
    const response = await authApi.passwordChangeAPI({ currentPassword, newPassword });
    return response.data;
}