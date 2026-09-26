import { getProfileService } from "../services";
import { setUser, clearUser } from "../store/slices/auth.slice";

export const initAuth = async (store) => {
    try {
        const data = await getProfileService();
        store.dispatch(setUser(data));
    } catch (error) {
        store.dispatch(clearUser());
    }
};