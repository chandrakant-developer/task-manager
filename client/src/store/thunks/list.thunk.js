import { getListService, createListService, deleteListService } from "../../services";
import { setList, addList, deleteList, setLoading, setError } from "../slices/list.slice";
import { getErrorMessage } from "../../helpers";

export const fetchListThunk = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await getListService();
        dispatch(setList(response.data));
    } catch (error) {
        dispatch(setError(getErrorMessage(error)));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const createListThunk = (name) => async (dispatch) => {
    try {
        const response = await createListService(name);
        dispatch(addList(response.data));
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteListThunk = (id) => async (dispatch) => {
    try {
        const response = await deleteListService(id);
        dispatch(deleteList(id));
        return response;
    } catch (error) {
        throw error;
    }
}