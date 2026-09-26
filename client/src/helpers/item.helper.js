import { toast } from "react-toastify";
import { toTitleCase } from "./string.helper";
import { getErrorMessage } from "./error.helper";

export async function handleCreateItem({
    name,
    dispatch,
    thunk,
    successMessage
}) {
    try {
        const formattedName = toTitleCase(name.trim());
        const response = await dispatch(thunk(formattedName));
        toast.success(response?.message || successMessage);
    } catch (error) {
        toast.error(getErrorMessage(error));
    }
}

export async function handleDeleteItem({
    dispatch,
    thunk,
    itemId,
    successMessage,
    errorMessage,
    onSuccess
}) {
    try {
        const response = await dispatch(thunk(itemId));
        toast.success(response?.message || successMessage);
        if (onSuccess) { onSuccess(); }
    } catch (error) {
        toast.error(getErrorMessage(error, errorMessage));
        throw error;
    }
}

export function prepareDeleteItem({
    id,
    name,
    isDefault,
    defaultMessage,
    setItemToDelete,
    setModalOpen
}) {
    if (isDefault) {
        toast.error(defaultMessage);
        return;
    }

    setItemToDelete({ id, name });
    setModalOpen(true);
}