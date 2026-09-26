import * as userApi from "../api/user.api";

export const getProfileService = async () => {
    const response = await userApi.userProfileAPI();
    return response.data;
};