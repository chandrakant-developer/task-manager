import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { useSelector } from 'react-redux';

export function TaskDetailsPanel({ isOpen, onClose, task, onDelete, onSave, }) {
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);

  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedList, setUpdatedList] = useState('');
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  const [updatedTags, setUpdatedTags] = useState([]);

  useEffect(() => {
    if (task) {
      setUpdatedTitle(task.title || '');
      setUpdatedDescription(task.description || '');
      setUpdatedList(task.list || '');
      setUpdatedDueDate(task.dueDate || '');
      setUpdatedTags(task.tags || []);
    } else {
      setUpdatedTitle('');
      setUpdatedDescription('');
      setUpdatedList('');
      setUpdatedDueDate('');
      setUpdatedTags([]);
    }
  }, [task]);

  function handleSave() {
    if (!updatedTitle.trim()) return;

    const taskData = {
      title: updatedTitle.trim(),
      description: updatedDescription.trim(),
      list: updatedList,
      dueDate: updatedDueDate,
      tags: updatedTags,
    };

    if (task) {
      onSave(task._id, taskData);
    } else {
      onSave(null, taskData);
    }

    setUpdatedTitle('');
    setUpdatedDescription('');
    setUpdatedList('');
    setUpdatedDueDate('');
    setUpdatedTags([]);
    onClose();
  }

  function toggleTag(tagName) {
    setUpdatedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  }

  const isCreateMode = !task;

  return (
    <>
      {isOpen && (
        <div className="w-[400px] min-w-[400px] max-w-[400px] h-[calc(100vh-2rem)] my-4 mr-4 ml-0 bg-white/95 border border-gray-200 rounded-2xl backdrop-blur-md shadow-lg flex flex-col overflow-hidden flex-none box-border">
          <div className="flex items-center justify-between px-5 py-7 gap-3 border-b border-gray-200">
            <h2 className="m-0 text-[1.75rem] font-semibold text-gray-900">
              {isCreateMode ? 'Create New Task' : 'Task Details'}
            </h2>

            <button
              className="p-2 flex items-center justify-center text-gray-500 rounded-md cursor-pointer bg-transparent transition-colors hover:bg-indigo-50 hover:text-indigo-500"
              onClick={onClose}
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col flex-1 h-full overflow-y-auto overflow-x-hidden custom-scroller">
            <div className="flex-1 px-6 pb-4 mb-0">
              <div className="flex flex-col mb-5 last:mb-0">
                <label
                  htmlFor="task-title"
                  className="mt-4 mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase tracking-[0.05em]"
                >
                  Title
                </label>

                <input
                  id="task-title"
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="w-full px-3 py-3 rounded-md border border-gray-200 bg-white text-base text-gray-900 outline-none transition-colors focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Title"
                />
              </div>

              <div className="flex flex-col mb-5 last:mb-0">
                <label
                  htmlFor="task-description"
                  className="mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase tracking-[0.05em]"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full min-h-[100px] px-3 py-3 rounded-md border border-gray-200 bg-white text-base text-gray-900 outline-none transition-colors resize-y focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Description (optional)"
                  rows="4"
                />
              </div>

              <div className="flex flex-col mb-5 last:mb-0">
                <label
                  htmlFor="task-list"
                  className="mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase tracking-[0.05em]"
                >
                  List
                </label>

                <div className="relative flex items-center gap-2 flex-1">
                  <select
                    id="task-list"
                    value={updatedList}
                    onChange={(e) => setUpdatedList(e.target.value)}
                    className="w-full px-3 py-3 rounded-md border border-gray-200 bg-white text-base text-gray-900 outline-none transition-colors appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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

              <div className="flex flex-col mb-5 last:mb-0">
                <label
                  htmlFor="task-due-date"
                  className="mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase tracking-[0.05em]"
                >
                  Due Date
                </label>

                <div className="relative flex items-center gap-2 flex-1">
                  <input
                    id="task-due-date"
                    type="date"
                    value={updatedDueDate}
                    onChange={(e) => setUpdatedDueDate(e.target.value)}
                    className="w-full px-3 py-3 rounded-md border border-gray-200 bg-white text-base text-gray-900 outline-none transition-colors focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="Due Date"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-5 last:mb-0">
                <label
                  htmlFor="task-tags"
                  className="mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase tracking-[0.05em]"
                >
                  Tags
                </label>

                <div className="relative flex items-center gap-2 flex-1">
                  <div className="flex flex-wrap gap-2 w-full">
                    {tags.map((tag) => {
                      const isSelected = updatedTags.includes(tag.name);
                      return (
                        <button
                          key={tag._id}
                          type="button"
                          className={`px-3 py-1.5 rounded-md border text-[0.85rem] font-medium cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm hover:bg-indigo-600 hover:border-indigo-600'
                              : 'bg-transparent border-gray-200 text-gray-500 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-500'
                          }`}
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

            <div className="flex flex-row gap-3 mt-auto px-6 py-5 border-t border-gray-200">
              <button
                className="w-full px-4 py-3 rounded-md border border-transparent bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={!updatedTitle.trim()}
              >
                {isCreateMode ? 'Create Task' : 'Save Changes'}
              </button>

              {!isCreateMode && (
                <button
                  className="w-full px-4 py-3 rounded-lg border border-transparent bg-rose-500/10 text-rose-500 text-sm font-medium transition-all duration-200 hover:bg-rose-500 hover:text-white"
                  onClick={() => onDelete(task._id)}
                >
                  Delete Task
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}