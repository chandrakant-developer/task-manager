import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Folder, Tag as TagIcon, Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { createListAsync, deleteListAsync } from '../store/slices/listSlice';
import { createTagAsync, deleteTagAsync } from '../store/slices/tagSlice';
import AddItemModal from '../components/AddItemModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { listColors, tagColors } from '../constants/colors';

function SettingsPage({ onClose }) {
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
    <div className="settings-page">
      <motion.div
        className="settings-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="settings-header">
          <div className="settings-header-content">
            <SettingsIcon size={24} />
            <h1>Settings</h1>
          </div>
          {onClose && (
            <button className="settings-close-btn" onClick={onClose} type="button">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="settings-content">
          {/* Lists and Tags Container */}
          <div className="settings-sections-wrapper">
            {/* Lists Section */}
            <motion.section
              className="settings-section-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="settings-section-header">
                <div className="settings-section-title">
                  <Folder size={20} />
                  <h2>Lists</h2>
                </div>
                <button
                  className="settings-add-btn"
                  onClick={() => setIsAddListModalOpen(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Add List</span>
                </button>
              </div>

              <div className="settings-items-container">
                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Default Lists</h3>
                  <div className="settings-items-grid">
                    {defaultLists.map((list, index) => {
                      const listColor = listColors[index % listColors.length];
                      return (
                        <motion.div
                          key={list._id}
                          className="settings-item"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="settings-item-content">
                            <Folder size={16} style={{ color: listColor, fill: listColor }} />
                            <span className="settings-item-name">{list.name}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Your Lists</h3>
                  {userLists.length > 0 ? (
                    <div className="settings-items-grid">
                      {userLists.map((list, index) => {
                        const listColor = listColors[(defaultLists.length + index) % listColors.length];
                        return (
                          <motion.div
                            key={list._id}
                            className="settings-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (defaultLists.length + index) * 0.05 }}
                          >
                            <div className="settings-item-content">
                              <Folder size={16} style={{ color: listColor, fill: listColor }} />
                              <span className="settings-item-name">{list.name}</span>
                            </div>
                            <button
                              className="settings-item-delete-btn"
                              onClick={() => handleDeleteList(list._id, list.name, list.isDefault)}
                              title="Delete list"
                              type="button"
                            >
                              <Trash2 size={16} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="settings-empty-text">No custom lists yet. Create your first list!</p>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Tags Section */}
            <motion.section
              className="settings-section-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="settings-section-header">
                <div className="settings-section-title">
                  <TagIcon size={20} />
                  <h2>Tags</h2>
                </div>
                <button
                  className="settings-add-btn"
                  onClick={() => setIsAddTagModalOpen(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Add Tag</span>
                </button>
              </div>

              <div className="settings-items-container">
                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Default Tags</h3>
                  <div className="settings-tags-grid">
                    {defaultTags.map((tag, index) => {
                      const tagColor = tagColors[index % tagColors.length];
                      return (
                        <motion.div
                          key={tag._id}
                          className="settings-tag-item"
                          style={{
                            backgroundColor: tagColor.bg,
                            color: tagColor.text,
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="settings-tag-badge">
                            {tag.name}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Your Tags</h3>
                  {userTags.length > 0 ? (
                    <div className="settings-tags-grid">
                      {userTags.map((tag, index) => {
                        const tagColor = tagColors[(defaultTags.length + index) % tagColors.length];
                        return (
                          <motion.div
                            key={tag._id}
                            className="settings-tag-item"
                            style={{
                              backgroundColor: tagColor.bg,
                              color: tagColor.text,
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (defaultTags.length + index) * 0.05 }}
                          >
                            <div className="settings-tag-badge">
                              {tag.name}
                            </div>
                            <button
                              className="settings-item-delete-btn"
                              onClick={() => handleDeleteTag(tag._id, tag.name, tag.isDefault)}
                              title="Delete tag"
                              type="button"
                            >
                              <Trash2 size={16} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="settings-empty-text">No custom tags yet. Create your first tag!</p>
                  )}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Other Settings Section - Placeholder for future settings */}
          <motion.section
            className="settings-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="settings-section-header">
              <div className="settings-section-title">
                <SettingsIcon size={20} />
                <h2>General Settings</h2>
              </div>
            </div>
            <div className="settings-items-container">
              <p className="settings-empty-text">More settings coming soon...</p>
            </div>
          </motion.section>
        </div>
      </motion.div>

      <AddItemModal
        isOpen={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
        onSave={handleAddList}
        title="Add New List"
        placeholder="Enter list name"
      />

      <AddItemModal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onSave={handleAddTag}
        title="Add New Tag"
        placeholder="Enter tag name"
      />

      <DeleteConfirmModal
        isOpen={isDeleteListModalOpen}
        onClose={() => {
          setIsDeleteListModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDeleteList}
        taskTitle={itemToDelete?.name}
        title="Delete List"
        message="Are you sure you want to delete this list?"
      />

      <DeleteConfirmModal
        isOpen={isDeleteTagModalOpen}
        onClose={() => {
          setIsDeleteTagModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDeleteTag}
        taskTitle={itemToDelete?.name}
        title="Delete Tag"
        message="Are you sure you want to delete this tag?"
      />
    </div>
  );
}

export default SettingsPage;

