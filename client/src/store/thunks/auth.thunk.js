import { registerService, loginService, getProfileService, refreshTokenService, logoutService, passwordChangeService } from "../../services";
import { setUser, clearUser, setAuthLoading } from "../slices/auth.slice";

export const registerUserThunk = (userData) => async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
        const response = await registerService(userData);
        return response;
    } catch (error) {
        throw error;
    } finally {
        dispatch(setAuthLoading(false));
    }
};

export const loginUserThunk = (credentials) => async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
        const response = await loginService(credentials);
        dispatch(setUser(response.data));
        return response;
    } catch (error) {
        throw error;
    } finally {
        dispatch(setAuthLoading(false));
    }
};

export const refreshTokenThunk = () => async (dispatch) => {
    try {
        await refreshTokenService();
    } catch (error) {
        dispatch(clearUser());
        throw error;
    }
};

export const restoreSessionThunk = () => async (dispatch) => {
    try {
        const response = await getProfileService();
        dispatch(setUser(response.data));
    } catch (error) {
        dispatch(clearUser());
        throw error;
    }
}

export const logoutUserThunk = () => async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
        const response = await logoutService();
        dispatch(clearUser());
        return response;
    } catch (error) {
        throw error;
    } finally {
        dispatch(setAuthLoading(false));
    }
};

export const changePasswordThunk = (data) => async (dispatch) => {
    try {
        await passwordChangeService(data);
    } catch (error) {
        throw error;
    }
}