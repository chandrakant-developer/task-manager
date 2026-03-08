import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Trash2, Folder, Tag as TagIcon, Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { createListAsync, deleteListAsync } from '../store/slices/listSlice';
import { createTagAsync, deleteTagAsync } from '../store/slices/tagSlice';
import { AddItemModal, DeleteConfirmModal } from '../components';
import { listColors, tagColors } from '../constants/colors';

export function SettingsPage({ onClose }) {
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();

  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
  const [isDeleteTagModalOpen, setIsDeleteTagModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const defaultLists = lists.filter((list) => list.isDefault);
  const userLists = lists.filter((list) => !list.isDefault);

  const defaultTags = tags.filter((tag) => tag.isDefault);
  const userTags = tags.filter((tag) => !tag.isDefault);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleAddList(newListName) {
    const formattedName = toTitleCase(newListName.trim());
    dispatch(createListAsync(formattedName))
      .then((result) => {
        if (createListAsync.fulfilled.match(result)) {
          toast.success(`List "${formattedName}" created successfully!`);
        } else {
          toast.error(`Error creating list: ${result.error.message}`);
        }
      });
  }

  function handleAddTag(newTagName) {
    const formattedName = toTitleCase(newTagName.trim());
    dispatch(createTagAsync(formattedName))
      .then((result) => {
        if (createTagAsync.fulfilled.match(result)) {
          toast.success(`Tag "${formattedName}" created successfully!`);
        } else {
          toast.error(`Error creating tag: ${result.error.message}`);
        }
      });
  }

  function handleDeleteList(id, name, isDefault) {
    if (isDefault) {
      toast.error('Cannot delete default list');
      return;
    }
    setItemToDelete({ id, name, type: 'list' });
    setIsDeleteListModalOpen(true);
  }

  function handleDeleteTag(id, name, isDefault) {
    if (isDefault) {
      toast.error('Cannot delete default tag');
      return;
    }
    setItemToDelete({ id, name, type: 'tag' });
    setIsDeleteTagModalOpen(true);
  }

  function confirmDeleteList() {
    if (itemToDelete && itemToDelete.type === 'list') {
      dispatch(deleteListAsync(itemToDelete.id))
        .then((result) => {
          if (deleteListAsync.fulfilled.match(result)) {
            toast.success(`List "${itemToDelete.name}" deleted successfully!`);
          } else {
            toast.error(`Error deleting list: ${result.error.message}`);
          }
          setIsDeleteListModalOpen(false);
          setItemToDelete(null);
        });
    }
  }

  function confirmDeleteTag() {
    if (itemToDelete && itemToDelete.type === 'tag') {
      dispatch(deleteTagAsync(itemToDelete.id))
        .then((result) => {
          if (deleteTagAsync.fulfilled.match(result)) {
            toast.success(`Tag "${itemToDelete.name}" deleted successfully!`);
          } else {
            toast.error(`Error deleting tag: ${result.error.message}`);
          }
          setIsDeleteTagModalOpen(false);
          setItemToDelete(null);
        });
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto custom-scroller px-10 py-7">
      <div className="max-w-[1200px] mx-auto bg-transparent rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between py-6 pr-4 border-b border-gray-200 bg-transparent">
          <div className="flex items-center gap-3">
            <SettingsIcon size={28} />

            <h1 className="m-0 text-[2.5rem] font-semibold leading-none text-gray-900">
              Settings
            </h1>
          </div>

          {onClose && (
            <button
              className="p-2 flex items-center justify-center text-gray-500 rounded-md cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
              onClick={onClose}
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="py-8">
          <div className="flex items-stretch gap-8 mb-12 -mx-8 px-8 flex-col md:flex-row">
            <div className="flex-1 flex flex-col bg-white/95 border border-gray-200 rounded-2xl p-7 shadow-sm min-h-0">
              <div className="flex items-center justify-between mb-6 gap-4 md:flex-row flex-col md:items-center">
                <div className="flex items-center gap-3">
                  <Folder size={20} />

                  <h2 className="m-0 text-xl font-semibold text-gray-900">
                    Lists
                  </h2>
                </div>

                <button
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsAddListModalOpen(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Add List</span>
                </button>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="m-0 text-xs font-semibold text-gray-500 uppercase tracking-[0.08em]">
                    Default Lists
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {defaultLists.map((list, index) => {
                      const listColor = listColors[index % listColors.length];
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
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="m-0 text-xs font-semibold text-gray-500 uppercase tracking-[0.08em]">
                    Your Lists
                  </h3>

                  {userLists.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {userLists.map((list, index) => {
                        const listColor = listColors[(defaultLists.length + index) % listColors.length];
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
                              onClick={() => handleDeleteList(list._id, list.name, list.isDefault)}
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
                    <p className="settings-empty-text">No custom lists yet. Create your first list!</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white/95 border border-gray-200 rounded-2xl p-7 shadow-sm min-h-0">
              <div className="flex items-center justify-between mb-6 gap-4 md:flex-row flex-col md:items-center">
                <div className="flex items-center gap-3">
                  <TagIcon size={20} />

                  <h2 className="m-0 text-xl font-semibold text-gray-900">
                    Tags
                  </h2>
                </div>

                <button
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsAddTagModalOpen(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Add Tag</span>
                </button>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="m-0 text-xs font-semibold text-gray-500 uppercase tracking-[0.08em]">
                    Default Tags
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {defaultTags.map((tag, index) => {
                      const tagColor = tagColors[index % tagColors.length];
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
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="m-0 text-xs font-semibold text-gray-500 uppercase tracking-[0.08em]">
                    Your Tags
                  </h3>

                  {userTags.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {userTags.map((tag, index) => {
                        const tagColor = tagColors[(defaultTags.length + index) % tagColors.length];
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
                              onClick={() => handleDeleteTag(tag._id, tag.name, tag.isDefault)}
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
                    <p className="settings-empty-text">No custom tags yet. Create your first tag!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 last:mb-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SettingsIcon size={20} />

                <h2 className="m-0 text-xl font-semibold text-gray-900">
                  General Settings
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <p className="m-0 text-sm text-gray-500">
                More settings coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddItemModal
        title="Add New List"
        placeholder="Enter list name"
        isOpen={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
        onSave={handleAddList}
      />

      <AddItemModal
        title="Add New Tag"
        placeholder="Enter tag name"
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onSave={handleAddTag}
      />

      <DeleteConfirmModal
        title="Delete List"
        message="Are you sure you want to delete this list?"
        isOpen={isDeleteListModalOpen}
        itemName={itemToDelete?.name}
        onClose={() => {
          setIsDeleteListModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDeleteList}
      />

      <DeleteConfirmModal
        title="Delete Tag"
        message="Are you sure you want to delete this tag?"
        isOpen={isDeleteTagModalOpen}
        itemName={itemToDelete?.name}
        onClose={() => {
          setIsDeleteTagModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDeleteTag}
      />
    </div>
  );
}
