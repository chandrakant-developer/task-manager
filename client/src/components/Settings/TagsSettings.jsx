import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tag as TagIcon, Plus, Trash2 } from "lucide-react";
import { AddItemModal, DeleteItemModal } from "../../components";
import { createTagThunk, deleteTagThunk } from "../../store/thunks/tag.thunk";
import { handleCreateItem, handleDeleteItem, prepareDeleteItem } from "../../helpers";

export const COLORS = [
  { bg: '#dbeafe', text: '#1e40af' },
  { bg: '#d1fae5', text: '#065f46' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#fee2e2', text: '#991b1b' },
  { bg: '#e9d5ff', text: '#6b21a8' },
  { bg: '#fce7f3', text: '#9f1239' },
  { bg: '#cffafe', text: '#164e63' },
  { bg: '#fed7aa', text: '#9a3412' },
];

export function TagsSettings() {
  const user = useSelector((state) => state.user.user);
  const tags = useSelector((state) => state.tags.tags);

  const dispatch = useDispatch();

  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isDeleteTagModalOpen, setIsDeleteTagModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const defaultTags = tags.filter((tag) => tag.isDefault);
  const userTags = tags.filter((tag) => !tag.isDefault);

  return (
    <div className="w-full min-w-0 bg-transparent shadow-none rounded-none">
      <h2 className="m-0 text-xl font-semibold text-gray-900 mb-2">
        Default Tags
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Built-in tags provided by the system to help you quickly organize and categorize your tasks.
      </p>

      <div className="flex flex-wrap gap-4 mt-4">
        {defaultTags.map((tag, index) => {
          const tagColor = COLORS[index % COLORS.length];
          return (
            <div
              key={tag._id}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md"
              style={{
                backgroundColor: tagColor.bg,
                color: tagColor.text,
              }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                {tag.name}
              </div>
            </div>
          );
        })}
      </div>

      {user?.role === 'user' && (
        <>
          <div className="flex items-center justify-between mt-12 mb-2">
            <h2 className="m-0 text-xl font-semibold text-gray-900">
              Custom Tags
            </h2>

            <button
              type="button"
              onClick={() => setIsAddTagModalOpen(true)}
              className="inline-flex items-center gap-2 p-1 rounded-full bg-indigo-50 border border-indigo-200 text-sm font-medium text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300 transition-all"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="mt-1 text-sm text-gray-600">
            Create and manage your own tags to organize tasks according to your personal workflow and preferences.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {userTags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {userTags.map((tag, index) => {
                  const tagColor = COLORS[(defaultTags.length + index) % COLORS.length];
                  return (
                    <div
                      key={tag._id}
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md"
                      style={{
                        backgroundColor: tagColor.bg,
                        color: tagColor.text,
                      }}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        {tag.name}
                      </div>

                      <button
                        className="ml-2 flex items-center justify-center text-gray-400 rounded-md transition-colors hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={() =>
                          prepareDeleteItem({
                            id: tag._id,
                            name: tag.name,
                            isDefault: tag.isDefault,
                            defaultMessage: "Cannot delete default tag",
                            setItemToDelete,
                            setModalOpen: setIsDeleteTagModalOpen
                          })
                        }
                        title="Delete tag"
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
                  onClick={() => setIsAddTagModalOpen(true)}
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
        title="Add New Tag"
        placeholder="Enter tag name"
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onSave={(name) =>
          handleCreateItem({
            name,
            dispatch,
            thunk: createTagThunk,
            successMessage: "Tag created successfully"
          })
        }
      />

      <DeleteItemModal
        title="Delete Tag"
        message="Are you sure you want to delete this tag?"
        isOpen={isDeleteTagModalOpen}
        itemName={itemToDelete?.name}
        onClose={() => setIsDeleteTagModalOpen(false)}
        onConfirm={() =>
          handleDeleteItem({
            dispatch,
            thunk: deleteTagThunk,
            itemId: itemToDelete.id,
            successMessage: "Tag deleted successfully",
            errorMessage: "Error deleting tag",
            onSuccess: () => {
              setIsDeleteTagModalOpen(false);
              setItemToDelete(null);
            }
          })
        }
      />
    </div>
  );
}