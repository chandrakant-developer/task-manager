import { createListAPI, deleteListAPI } from "../services/api";
import { addList, deleteList } from "../store/slices/listSlice";
import { toast } from "react-toastify";

const getUserId = (user) => user?.role === "admin" ? null : user?.userId;
const getErrorMessage = (error, fallback) => error?.response?.data?.message || error?.message || fallback; 

export const handleAddList = async (dispatch, name, user) => {
  try {
    const userId = getUserId(user);
    const res = await createListAPI(name, userId);
    dispatch(addList(res.data));
    toast.success(res?.message || "List created successfully");
  } catch (error) {
    console.error("Error creating list", error);
    toast.error(getErrorMessage(error, "Failed to create list"));
  }
};

export const confirmDeleteList = async (dispatch, id, user) => {
  try {
    const userId = getUserId(user);
    const res = await deleteListAPI(id, userId);
    dispatch(deleteList(id));
    toast.success(res?.message || "List deleted successfully");
  } catch (error) {
    console.error("Error deleting list", error);
    toast.error(getErrorMessage(error, "Failed to delete list"));
  }
}