import { getTagsService, createTagService, deleteTagService } from "../../services";
import { setTag, addTag, deleteTag, setLoading, setError } from "../slices/tag.slice";
import { getErrorMessage } from "../../helpers";

export const fetchTagThunk = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await getTagsService();
        dispatch(setTag(response.data));
    } catch (error) {
        dispatch(setError(getErrorMessage(error)));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const createTagThunk = (name) => async (dispatch) => {
    try {
        const response = await createTagService(name);
        dispatch(addTag(response.data));
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteTagThunk = (id) => async (dispatch) => {
    try {
        const response = await deleteTagService(id);
        dispatch(deleteTag(id));
        return response;
    } catch (error) {
        throw error;
    }
}