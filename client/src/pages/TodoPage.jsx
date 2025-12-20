import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ChevronRight } from 'lucide-react';
import TaskDetailsPanel from '../components/TaskDetailsPanel';
import { DEFAULT_LISTS, DEFAULT_TAGS } from '../constants/defaults';

function TodoPage({ todos = [], setTodos }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  function openCreatePanel() {
    setSelectedTask(null);
    setIsCreateMode(true);
    setIsDetailsPanelOpen(true);
  }

  function handleToggleCompleted(todo) {
    setTodos(
      todos.map((t) =>
        t._id === todo._id ? { ...t, completed: !t.completed } : t
      )
    );

    if (selectedTask && selectedTask._id === todo._id) {
      setSelectedTask({ ...selectedTask, completed: !selectedTask.completed });
    }
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter((t) => t._id !== id));
    }
  }

  function handleSaveTask(id, taskData) {
    if (id === null) {
      const timestamp = Date.now();
      const random = Math.random().toString(36).slice(2, 11);
      const newTodo = {
        _id: `${timestamp}-${random}`,
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setTodos([...todos, newTodo]);
    } else {
      setTodos(todos.map((t) => (t._id === id ? { ...t, ...taskData } : t)));

      if (selectedTask && selectedTask._id === id) {
        setSelectedTask({ ...selectedTask, ...taskData });
      }
    }
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filter === 'active') return matchesSearch && !todo.completed;
    if (filter === 'completed') return matchesSearch && todo.completed;

    return matchesSearch;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className={`todo-page-container ${isDetailsPanelOpen ? 'panel-open' : ''}`}>
      <div className="app-root">
        <main className="app-main">
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="card-header">
              <h2>
                <span>All Tasks</span>
                <span className="task-count-box">
                  <span className="task-count-number">{stats.total}</span>
                  <span className="task-count-label">Total</span>
                </span>
              </h2>
            </div>

            <div className="search-filter-bar">
              <div className="filter-buttons">
                <button
                  className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>

                <button
                  className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>

                <button
                  className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>

              <div className="filter-divider"></div>

              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredTodos.length === 0 && (
              <p className="empty-text">
                {searchQuery
                  ? 'No tasks match your search'
                  : filter !== 'all'
                    ? `No ${filter} tasks`
                    : 'No tasks yet. Create your first task!'}
              </p>
            )}

            <AnimatePresence>
              <ul className="todo-list">
                {filteredTodos.map((todo) => (
                  <motion.li
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`todo-item ${todo.completed ? 'completed' : ''} ${selectedTask && selectedTask._id === todo._id ? 'active' : ''
                      }`}
                  >
                    <div
                      className="todo-main"
                      onClick={() => {
                        setSelectedTask(todo);
                        setIsCreateMode(false);
                        setIsDetailsPanelOpen(true);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <motion.input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleCompleted(todo);
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <div className="todo-text">
                        <div className="todo-title">{todo.title}</div>
                        {todo.description && (
                          <div className="todo-description">
                            {todo.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="todo-arrow"
                      onClick={() => {
                        setSelectedTask(todo);
                        setIsCreateMode(false);
                        setIsDetailsPanelOpen(true);
                      }}
                    />
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          </motion.section>
        </main>

        {!isCreateMode && (
          <motion.button
            className="floating-add-btn"
            onClick={openCreatePanel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            type="button"
          >
            <Plus size={24} />
          </motion.button>
        )}
      </div>

      <TaskDetailsPanel
        isOpen={isDetailsPanelOpen}
        onClose={() => {
          setIsDetailsPanelOpen(false);
          setSelectedTask(null);
          setIsCreateMode(false);
        }}
        task={selectedTask}
        onDelete={handleDelete}
        onSave={handleSaveTask}
        lists={DEFAULT_LISTS}
        tags={DEFAULT_TAGS}
      />
    </div>
  );
}

export default TodoPage;
