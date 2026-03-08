import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createListAsync } from '../store/slices/listSlice';
import { createTagAsync } from '../store/slices/tagSlice';
import { Calendar, CalendarDays, Clock, Star, Folder, Plus, ChevronRight, User, CheckSquare } from 'lucide-react';
import { tagColors, listColors } from '../constants/colors';
import { DEFAULT_TASKS } from '../constants/defaults';
import { AddItemModal, UserMenu } from "../components";

export function Sidebar() {
  const todos = useSelector((state) => state.todos.todos);
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();
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
    <>
      <aside
        className="fixed left-4 top-4 w-[320px] h-[calc(100vh-2rem)] bg-white/95 border border-gray-200 rounded-lg backdrop-blur-md z-[1000] flex flex-col overflow-hidden shadow-md hidden md:block"
        ref={sidebarRef}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200 gap-3 shrink-0">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-indigo-500 inline-flex items-center justify-center text-white shrink-0">
                <CheckSquare size={26} />
              </div>

              <div className="min-w-0">
                <h2 className="mb-[0.15rem] text-[1.4rem] font-bold text-gray-900">
                  Task Manager
                </h2>

                <p className="text-xs text-gray-600 leading-[1.3] truncate">
                  Organize your daily tasks efficiently
                </p>
              </div>
            </div>
          </div>

          <div className="custom-scroller flex-1 overflow-y-auto overflow-x-hidden min-h-0">
            <div className="mt-2 mb-3 pr-3">
              <div className="w-full flex items-center justify-between py-2 pl-5 text-gray-500 text-xs font-semibold rounded-lg text-left uppercase tracking-wide">
                Tasks
              </div>

              <ul className="list-none pl-6 overflow-hidden space-y-[0.05rem]">
                {DEFAULT_TASKS.map((menuItem) => {
                  const IconComponent = getTaskMenuIcon(menuItem.id);
                  const count = getTaskMenuCount(menuItem.id);

                  return (
                    <li key={menuItem.id}>
                      <button
                        className="w-full flex items-center justify-between gap-2 px-2 py-2 text-sm text-gray-500 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
                        title={menuItem.label}
                      >
                        <span className='flex items-center gap-2 flex-1'>
                          <IconComponent size={16} />
                          <span>{menuItem.label}</span>
                        </span>

                        {count > 0 && (
                          <span className="flex items-center justify-center w-7 h-5 bg-gray-200 text-gray-500 rounded text-xs font-semibold leading-none shrink-0">
                            {count}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-3 pr-3">
              <div className="w-full flex items-center justify-between py-2 pl-5 text-gray-500 text-xs font-semibold rounded-lg text-left uppercase tracking-wide">
                Lists
                <button
                  className="flex items-center gap-1 px-2 py-1 text-indigo-500 text-xs font-medium rounded cursor-pointer transition-opacity duration-200 shrink-0 ml-auto hover:opacity-90"
                  onClick={() => setIsAddListModalOpen(true)}
                  title="Add New List"
                >
                  <Plus size={14} />
                  <span>Add List</span>
                </button>
              </div>

              <ul className="list-none pl-6 overflow-hidden space-y-[0.05rem]">
                {lists.map((list, index) => {
                  const listCount = getListCount(list.name);

                  return (
                    <li key={list._id}>
                      <button
                        className="w-full flex items-center justify-between gap-2 px-2 py-2 text-sm text-gray-500 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
                        title={list.name}
                      >
                        <span className='flex items-center gap-2 flex-1'>
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
                          <span className="flex items-center justify-center w-7 h-5 bg-gray-200 text-gray-500 rounded text-xs font-semibold leading-none shrink-0">
                            {listCount}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-4 pr-3">
              <div className="w-full flex items-center justify-between py-2 pl-5 text-gray-500 text-xs font-semibold rounded-lg text-left uppercase tracking-wide">
                Tags
                <button
                  className="flex items-center gap-1 px-2 py-1 text-indigo-500 text-xs font-medium rounded cursor-pointer transition-opacity duration-200 shrink-0 ml-auto hover:opacity-90"
                  onClick={() => setIsAddTagModalOpen(true)}
                  title="Add New Tag"
                >
                  <Plus size={14} />
                  <span>Add Tag</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 px-5 mt-2">
                {tags.map((tag, index) => {
                  const tagColor = tagColors[index % tagColors.length];
                  return (
                    <button
                      key={tag._id}
                      className="inline-flex items-center gap-1 ml-2 px-3 py-1.5 bg-indigo-500 text-gray-900 border border-black/10 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap transition hover:opacity-90 hover:-translate-y-px hover:shadow-sm"
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

          <div className="sticky bottom-0 z-10 mt-auto px-5 py-3 border-t border-gray-200 flex flex-col gap-2 bg-white/95 backdrop-blur-md shrink-0">
            <div className="relative z-[50]">
              <button
                ref={userButtonRef}
                className="group w-full flex items-center gap-2 py-2 rounded-lg cursor-pointer transition-colors text-gray-900"
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
                <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white shrink-0">
                  <User size={18} />
                </div>

                <div className="flex flex-col items-start gap-0 flex-1 min-w-0 text-left">
                  <span className="text-sm font-semibold text-gray-900 leading-tight w-full truncate">
                    Chandrakant Patil
                  </span>

                  <span className="text-xs text-gray-500 leading-[1.2] w-full truncate">
                    chandrakant.patil@example.com
                  </span>
                </div>

                <ChevronRight
                  size={24}
                  className={`text-gray-500 p-1 rounded shrink-0 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-500 ${isUserMenuOpen ? 'open' : ''}`}
                />
              </button>
            </div>
          </div>

          <UserMenu
            isOpen={isUserMenuOpen}
            menuPosition={menuPosition}
            onClose={() => setIsUserMenuOpen(false)}
          />

          <AddItemModal
            title="Add New List"
            placeholder="Enter list name"
            isOpen={isAddListModalOpen}
            onClose={() => setIsAddListModalOpen(false)}
            onSave={handleAddList}
          />

          <AddItemModal
            title="Add New List"
            placeholder="Enter list name"
            isOpen={isAddTagModalOpen}
            onClose={() => setIsAddTagModalOpen(false)}
            onSave={handleAddTag}
          />
        </div>
      </aside>
    </>
  );
}