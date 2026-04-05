import { createTagAPI, deleteTagAPI } from "../services/api";
import { addTag, deleteTag } from "../store/slices/tagSlice";
import { toast } from "react-toastify";

const getUserId = (user) => user?.role === "admin" ? null : user?.userId;
const getErrorMessage = (error, fallback) => error?.response?.data?.message || error?.message || fallback;

export const handleAddTag = async (dispatch, name, user) => {
  try {
    const userId = getUserId(user);
    const res = await createTagAPI(name, userId);
    dispatch(addTag(res.data));
    toast.success(res?.message || "Tag created successfully");
  } catch (error) {
    console.error("Error creating tag", error);
    toast.error(getErrorMessage(error, "Failed to create tag"));
  }
};

export const confirmDeleteTag = async (dispatch, id, user) => {
  try {
    const userId = getUserId(user);
    const res = await deleteTagAPI(id, userId);
    dispatch(deleteTag(id));
    toast.success(res?.message || "Tag deleted successfully");
  } catch (error) {
    console.error("Error deleting tag", error);
    toast.error(getErrorMessage(error, "Failed to delete tag"));
  }
}