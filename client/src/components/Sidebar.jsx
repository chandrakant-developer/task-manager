import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createListAsync } from '../store/slices/listSlice';
import { createTagAsync } from '../store/slices/tagSlice';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  CalendarDays,
  Clock,
  Star,
  Settings,
  LogOut,
  Folder,
  Plus,
  ChevronRight,
  User,
} from 'lucide-react';
import { tagColors, listColors } from '../constants/colors';
import { DEFAULT_TASK_MENU_ITEMS } from '../constants/defaults';
import AddItemModal from './AddItemModal';

function Sidebar() {
  const todos = useSelector((state) => state.todos.todos);
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const userButtonRef = useRef(null);
  const sidebarRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleAddList(newListName) {
    const formattedName = toTitleCase(newListName.trim());
    dispatch(createListAsync(formattedName));
  }

  function handleAddTag(newTagName) {
    const formattedName = toTitleCase(newTagName.trim());
    dispatch(createTagAsync(formattedName));
  }

  const today = new Date().toISOString().split('T')[0];

  const getTaskMenuCount = (menuId) => {
    switch (menuId) {
      case 'upcoming':
        return todos.filter((t) => !t.completed && t.dueDate && t.dueDate > today).length;
      case 'today':
        return todos.filter((t) => !t.completed && t.dueDate === today).length;
      case 'calendar':
        return todos.filter((t) => !t.completed && t.dueDate).length;
      case 'starred':
        return todos.filter((t) => !t.completed && t.starred).length;
      default:
        return 0;
    }
  };

  const getTaskMenuIcon = (menuId) => {
    switch (menuId) {
      case 'upcoming':
        return Clock;
      case 'today':
        return Calendar;
      case 'calendar':
        return CalendarDays;
      case 'starred':
        return Star;
      default:
        return Clock;
    }
  };

  const getListCount = (listName) => {
    return todos.filter((t) => t.list === listName).length;
  };

  return (
    <aside className="sidebar" ref={sidebarRef}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <motion.div
              className="sidebar-logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              ✓
            </motion.div>

            <div>
              <h2 className="sidebar-title">Task Manager</h2>
              <p className="sidebar-subtitle"> Organize your daily tasks efficiently </p>
            </div>
          </div>
        </div>

        <div className="sidebar-scrollable">
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>Tasks</span>
            </div>

            <ul className="sidebar-sublist">
              {DEFAULT_TASK_MENU_ITEMS.map((menuItem) => {
                const IconComponent = getTaskMenuIcon(menuItem.id);
                const count = getTaskMenuCount(menuItem.id);

                return (
                  <li key={menuItem.id}>
                    <button className="sidebar-item" title={menuItem.label}>
                      <span>
                        <IconComponent size={16} />
                        <span>{menuItem.label}</span>
                      </span>

                      {count > 0 && (
                        <span className="sidebar-item-count">{count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>Lists</span>
              <button
                className="sidebar-add-btn"
                onClick={() => setIsAddListModalOpen(true)}
                title="Add New List"
              >
                <Plus size={14} />
                <span>Add List</span>
              </button>
            </div>

            <ul className="sidebar-sublist">
              {lists.map((list, index) => {
                const listCount = getListCount(list.name);

                return (
                  <li key={list._id}>
                    <button className="sidebar-item" title={list.name}>
                      <span>
                        <Folder
                          size={16}
                          style={{
                            color: listColors[index % listColors.length],
                            fill: listColors[index % listColors.length],
                          }}
                        />
                        <span>{list.name}</span>
                      </span>

                      {listCount > 0 && (
                        <span className="sidebar-item-count">{listCount}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>Tags</span>
              <button
                className="sidebar-add-btn"
                onClick={() => setIsAddTagModalOpen(true)}
                title="Add New Tag"
              >
                <Plus size={14} />
                <span>Add Tag</span>
              </button>
            </div>

            <div className="sidebar-tags-container">
              {tags.map((tag, index) => {
                const tagColor = tagColors[index % tagColors.length];
                return (
                  <button
                    key={tag._id}
                    className="sidebar-tag"
                    title={tag.name}
                    style={{
                      backgroundColor: tagColor.bg,
                      color: tagColor.text,
                    }}
                  >
                    <span>{tag.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-user-section">
            <button
              ref={userButtonRef}
              className="sidebar-user-btn"
              onClick={() => {
                if (userButtonRef.current && sidebarRef.current) {
                  const sidebarRect = sidebarRef.current.getBoundingClientRect();
                  setMenuPosition({
                    bottom: window.innerHeight - sidebarRect.bottom,
                    left: sidebarRect.right,
                  });
                }
                setIsUserMenuOpen(!isUserMenuOpen);
              }}
            >
              <div className="sidebar-user-avatar">
                <User size={18} />
              </div>

              <div className="sidebar-user-info">
                <span className="sidebar-user-name">Chandrakant Patil</span>
                <span className="sidebar-user-email"> chandrakant.patil@example.com </span>
              </div>

              <ChevronRight
                size={24}
                className={`sidebar-user-chevron ${isUserMenuOpen ? 'open' : ''}`}
              />
            </button>
          </div>
        </div>

        {createPortal(
          <AnimatePresence>
            {isUserMenuOpen && (
              <>
                <motion.div
                  className="sidebar-user-menu-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsUserMenuOpen(false)}
                />

                <motion.div
                  className="sidebar-user-menu"
                  style={{
                    position: 'fixed',
                    bottom: `${menuPosition.bottom}px`,
                    left: `${menuPosition.left}px`,
                  }}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className="sidebar-user-menu-item"
                    title="Settings"
                    onClick={() => {
                      navigate('/settings');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <button className="sidebar-user-menu-item" title="Sign Out">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

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
      </div>
    </aside>
  );
}

export default Sidebar;
