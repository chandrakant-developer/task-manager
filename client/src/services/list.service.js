import * as listApi from "../api/list.api";

export const getListService = async () => {
    const response = await listApi.getListsAPI();
    return response.data;
}

export const createListService = async (name) => {
    const response = await listApi.createListAPI({ name });
    return response.data;
}

export const deleteListService = async (id) => {
    const response = await listApi.deleteListAPI(id);
    return response.data;
}