import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function TaskDetailsPanel({
  isOpen,
  onClose,
  task,
  onDelete,
  onSave,
}) {
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (task) {
      setEditTitle(task.title || '');
      setEditDescription(task.description || '');
      setSelectedList(task.list || '');
      setDueDate(task.dueDate || '');
      setSelectedTags(task.tags || []);
    } else {
      setEditTitle('');
      setEditDescription('');
      setSelectedList('');
      setDueDate('');
      setSelectedTags([]);
    }
  }, [task]);

  function handleSave() {
    if (!editTitle.trim()) return;

    const taskData = {
      title: editTitle.trim(),
      description: editDescription.trim(),
      list: selectedList,
      dueDate: dueDate,
      tags: selectedTags,
    };

    if (task) {
      onSave(task._id, taskData);
    } else {
      onSave(null, taskData);
    }

    setEditTitle('');
    setEditDescription('');
    setSelectedList('');
    setDueDate('');
    setSelectedTags([]);
    onClose();
  }

  function toggleTag(tagName) {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  }

  const isCreateMode = !task;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="task-details-panel"
          initial={{ x: 450 }}
          animate={{ x: 0 }}
          exit={{ x: 450 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="task-details-header">
            <h2>{isCreateMode ? 'Create New Task' : 'Task Details'}</h2>
            
            <button className="task-details-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="task-details-content">
            <div className="task-details-section">
              <div className="task-details-form-group">
                <label htmlFor="task-title">Title</label>

                <input
                  id="task-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="task-details-input"
                  placeholder="Title"
                />
              </div>

              <div className="task-details-form-group">
                <label htmlFor="task-description">Description</label>

                <textarea
                  id="task-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="task-details-textarea"
                  placeholder="Description (optional)"
                  rows="4"
                />
              </div>

              <div className="task-details-form-group">
                <label htmlFor="task-list">List</label>

                <div className="task-details-select-wrapper">
                  <select
                    id="task-list"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                    className="task-details-select"
                  >
                    <option value="">Select List</option>
                    {lists.map((list) => (
                      <option key={list._id} value={list.name}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="task-details-form-group">
                <label htmlFor="task-due-date">Due Date</label>

                <div className="task-details-date-wrapper">
                  <input
                    id="task-due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="task-details-date-input"
                    placeholder="Due Date"
                  />
                </div>
              </div>

              <div className="task-details-form-group">
                <label htmlFor="task-tags">Tags</label>

                <div className="task-details-tags-wrapper">
                  <div className="task-details-tags-container">
                    {tags.map((tag) => {
                      const isSelected = selectedTags.includes(tag.name);
                      return (
                        <button
                          key={tag._id}
                          type="button"
                          className={`task-details-tag ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleTag(tag.name)}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="task-details-actions">
              <motion.button
                className="task-details-save-btn"
                onClick={handleSave}
                disabled={!editTitle.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCreateMode ? 'Create Task' : 'Save Changes'}
              </motion.button>

              {!isCreateMode && (
                <motion.button
                  className="task-details-delete-btn"
                  onClick={() => onDelete(task._id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete Task
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskDetailsPanel;
