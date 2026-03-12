import { useState, useRef } from 'react';
import { Calendar, CalendarDays, Clock, Star, Folder, Plus, ChevronRight, User, CheckSquare } from 'lucide-react';

import { TAG_COLORS, LIST_COLORS, SMART_FILTER_OPTIONS } from '../constants';
import { AddItemModal, UserMenu } from "../components";

import { addList } from "../store/slices/listSlice";
import { addTag } from "../store/slices/tagSlice";
import { useSelector, useDispatch } from "react-redux";

export function Sidebar() {
  const lists = useSelector((state) => state.lists.lists);
  const tags = useSelector((state) => state.tags.tags);
  const todos = useSelector((state) => state.tasks.todos);
  const dispatch = useDispatch();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);

  const sidebarRef = useRef(null);
  const userButtonRef = useRef(null);

  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });

  const today = new Date().toLocaleDateString("en-CA");

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleAddList(name) {
    const formatted = toTitleCase(name.trim());

    dispatch(addList(formatted));
  }

  function handleAddTag(name) {
    const formatted = toTitleCase(name.trim());

    dispatch(addTag(formatted));
  }

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

  function getTaskMenuCount(menuId) {    
    switch (menuId) {

      case "upcoming":
        return todos.filter(
          (t) => !t.completed && t.dueDate && t.dueDate > today
        ).length;

      case "todays":
        return todos.filter(
          (t) => !t.completed && t.dueDate === today
        ).length;

      case "calendar":
        return todos.filter(
          (t) => !t.completed && t.dueDate
        ).length;

      case "starred":
        return todos.filter(
          (t) => t.starred
        ).length;

      default:
        return 0;
    }
  }

  function getListCount(listName) {
    return todos.filter((t) => t.list === listName).length;
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className="fixed left-4 top-4 w-[320px] h-[calc(100vh-2rem)] bg-white/95 border border-gray-200 rounded-lg backdrop-blur-md z-[1000] flex flex-col overflow-hidden shadow-md hidden md:block"
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
            <div className="mt-2 mb-3">
              <div className="py-2 px-4 text-gray-500 text-xs font-semibold text-left uppercase tracking-wide">
                Tasks
              </div>

              <ul className="list-none pl-6 pr-2 overflow-hidden">
                {SMART_FILTER_OPTIONS.map((menuItem) => {
                  const Icon = getTaskMenuIcon(menuItem.id);
                  const count = getTaskMenuCount(menuItem.id);

                  return (
                    <li key={menuItem.id}>
                      <div className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-600 rounded hover:bg-indigo-50">
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          <div>{menuItem.label}</div>
                        </div>

                        <div className="flex items-center justify-center w-7 h-5 bg-gray-200 text-gray-500 rounded text-xs font-semibold leading-none shrink-0">
                          {count}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between py-2 px-4 text-gray-500 text-xs font-semibold text-left uppercase tracking-wide">
                Lists
                <button
                  className="flex items-center gap-1 text-indigo-500 text-xs font-medium normal-case cursor-pointer hover:opacity-90"
                  onClick={() => setIsAddListModalOpen(true)}
                  title="Add New List"
                >
                  <Plus size={14} />
                  <div>Add List</div>
                </button>
              </div>

              <ul className="list-none pl-6 pr-2 overflow-hidden">
                {lists.map((list, index) => (
                  <li key={list._id}>
                    <div className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-600 rounded hover:bg-indigo-50">
                      <div className='flex items-center gap-2'>
                        <Folder
                          size={16}
                          style={{
                            color: LIST_COLORS[index % LIST_COLORS.length],
                            fill: LIST_COLORS[index % LIST_COLORS.length],
                          }}
                        />
                        <div>{list.name}</div>
                      </div>

                      <div className="flex items-center justify-center w-7 h-5 bg-gray-200 text-gray-500 rounded text-xs font-semibold leading-none shrink-0">
                        {getListCount(list.name)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between py-2 px-4 text-gray-500 text-xs font-semibold text-left uppercase tracking-wide">
                Tags
                <button
                  className="flex items-center gap-1 text-indigo-500 text-xs font-medium cursor-pointer hover:opacity-90"
                  onClick={() => setIsAddTagModalOpen(true)}
                  title="Add New Tag"
                >
                  <Plus size={14} />
                  <div>Add Tag</div>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 px-5 mt-2 ml-3">
                {tags.map((tag, index) => {
                  const color = TAG_COLORS[index % TAG_COLORS.length];

                  return (
                    <div
                      key={tag._id}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-gray-900 border border-black/10 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap transition hover:opacity-90 hover:-translate-y-px hover:shadow-sm"
                      title={tag.name}
                      style={{ backgroundColor: color.bg, color: color.text, }}
                    >
                      {tag.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 mt-auto px-5 py-3 border-t border-gray-200 flex flex-col gap-2 bg-white/95 backdrop-blur-md shrink-0">
            <div
              className="group w-full flex items-center gap-2 py-2 rounded-lg cursor-pointer transition-colors text-gray-900"
              ref={userButtonRef}
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
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-400 rounded-full text-white shrink-0">
                <User size={18} />
              </div>

              <div className="flex flex-col items-start flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-gray-900 leading-tight truncate">
                  Chandrakant Patil
                </div>

                <div className="text-xs text-gray-500 leading-[1.2] truncate">
                  chandrakant.patil@example.com
                </div>
              </div>

              <ChevronRight
                size={24}
                className={`text-gray-500 p-1 rounded shrink-0 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-500
                  ${isUserMenuOpen ? 'bg-indigo-50' : ''}`}
              />
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
            title="Add New Tag"
            placeholder="Enter tag name"
            isOpen={isAddTagModalOpen}
            onClose={() => setIsAddTagModalOpen(false)}
            onSave={handleAddTag}
          />
        </div>
      </aside>
    </>
  );
}