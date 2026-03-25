import { userAPI } from "../services/api";
import { setUser, clearUser } from "../store/slices/auth.slice";

export const initAuth = async (store) => {
    try {
        const data = await userAPI();
        store.dispatch(setUser(data));
    } catch (error) {
        store.dispatch(clearUser());
    }
};