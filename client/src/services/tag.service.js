import * as tagApi from "../api/tag.api";

export const getTagsService = async () => {
    const response = await tagApi.getTagsAPI();
    return response.data;
}

export const createTagService = async (name) => {
    const response = await tagApi.createTagAPI({ name });
    return response.data;
}

export const deleteTagService = async (id) => {
    const response = await tagApi.deleteTagAPI(id);
    return response.data;
}