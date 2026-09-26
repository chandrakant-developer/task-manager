import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Folder, Plus, Trash2 } from "lucide-react";
import { AddItemModal, DeleteItemModal } from "../../components";
import { createListThunk, deleteListThunk } from "../../store/thunks/list.thunk";
import { handleCreateItem, handleDeleteItem, prepareDeleteItem } from "../../helpers";

export const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

export function ListsSettings() {
    const user = useSelector((state) => state.user.user);
    const lists = useSelector((state) => state.lists.lists);

    const dispatch = useDispatch();

    const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
    const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const defaultLists = lists.filter((list) => list.isDefault);
    const userLists = lists.filter((list) => !list.isDefault);

    return (
        <div className="w-full min-w-0 bg-transparent shadow-none rounded-none">
            <h2 className="m-0 text-xl font-semibold text-gray-900 mb-2">
                Default Lists
            </h2>

            <p className="mt-1 text-sm text-gray-600">
                Built-in lists provided by the system to help you quickly organize and categorize your tasks.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
                {defaultLists.map((list, index) => {
                    const listColor = COLORS[index % COLORS.length];
                    return (
                        <div
                            key={list._id}
                            className="flex items-center justify-start px-4 py-2 bg-transparent border border-gray-200 rounded-md transition-all hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <Folder size={16} style={{ color: listColor, fill: listColor }} />

                                <span className="text-sm font-medium text-gray-900 truncate">
                                    {list.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {user?.role === 'user' && (
                <>
                    <div className="flex items-center justify-between mt-12 mb-2">
                        <h2 className="m-0 text-xl font-semibold text-gray-900">
                            Custom Lists
                        </h2>

                        <button
                            type="button"
                            onClick={() => setIsAddListModalOpen(true)}
                            className="inline-flex items-center gap-2 p-1 rounded-full bg-indigo-50 border border-indigo-200 text-sm font-medium text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300 transition-all"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                        Create and manage your own lists to organize tasks according to your personal workflow and preferences.
                    </p>

                    <div className="flex flex-col gap-4 mt-4">
                        {userLists.length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {userLists.map((list, index) => {
                                    const listColor = COLORS[(defaultLists.length + index) % COLORS.length];
                                    return (
                                        <div
                                            key={list._id}
                                            className="flex items-center justify-start px-4 py-2 bg-transparent border border-gray-200 rounded-md transition-all hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Folder size={16} style={{ color: listColor, fill: listColor }} />

                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {list.name}
                                                </span>
                                            </div>

                                            <button
                                                className="ml-4 flex items-center justify-center text-gray-400 rounded-md transition-colors hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                                onClick={() =>
                                                    prepareDeleteItem({
                                                        id: list._id,
                                                        name: list.name,
                                                        isDefault: list.isDefault,
                                                        defaultMessage: "Cannot delete default list",
                                                        setItemToDelete,
                                                        setModalOpen: setIsDeleteListModalOpen
                                                    })
                                                }
                                                title="Delete list"
                                                type="button"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No custom tags yet.{" "}
                                <button
                                type="button"
                                onClick={() => setIsAddListModalOpen(true)}
                                className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
                                >
                                Click here
                                </button>{" "}
                                to create your first tag.
                            </p>
                        )}
                    </div>
                </>
            )}

            <AddItemModal
                title="Add New List"
                placeholder="Enter list name"
                isOpen={isAddListModalOpen}
                onClose={() => setIsAddListModalOpen(false)}
                onSave={(name) =>
                    handleCreateItem({
                        name,
                        dispatch,
                        thunk: createListThunk,
                        successMessage: "List created successfully"
                    })
                }
            />

            <DeleteItemModal
                title="Delete List"
                message="Are you sure you want to delete this list?"
                isOpen={isDeleteListModalOpen}
                itemName={itemToDelete?.name}
                onClose={() => setIsDeleteListModalOpen(false)}
                onConfirm={() =>
                    handleDeleteItem({
                        dispatch,
                        thunk: deleteListThunk,
                        itemId: itemToDelete.id,
                        successMessage: "List deleted successfully",
                        errorMessage: "Error deleting list",
                        onSuccess: () => {
                            setIsDeleteListModalOpen(false);
                            setItemToDelete(null);
                        }
                    })
                }
            />
        </div>
    );
}