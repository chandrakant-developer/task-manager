import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddItemModal } from "../Modals";
import { getListCounts, handleCreateItem, } from "../../helpers";
import { fetchTodosThunk, fetchTodoCountsThunk, } from "../../store/thunks/todo.thunk";
import { createListThunk } from "../../store/thunks/list.thunk";
import { createTagThunk } from "../../store/thunks/tag.thunk";
import { TaskMenu } from "../Menus/TaskMenu";
import { ListMenu } from "../Menus/ListMenu";
import { TagMenu } from "../Menus/TagMenu";

import { User, ChevronRight, CheckSquare } from "lucide-react";
import { UserMenu } from "../Menus/UserMenu";
import { SettingsModal } from "../Modals/SettingsModal";

export function TaskSidebar() {
  const user = useSelector((state) => state.user.user);
  const todos = useSelector((state) => state.todos.todos);
  const { todoCounts, todoCountsLoading } = useSelector((state) => state.todos);
  const { lists, loading: listsLoading, error: listsError } = useSelector((state) => state.lists);
  const { tags, loading: tagsLoading, error: tagsError } = useSelector((state) => state.tags);

  const dispatch = useDispatch();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0, });

  const sidebarRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodoCountsThunk());
  }, [dispatch]);

  const listCounts = useMemo(() => {
    return getListCounts(todos);
  }, [todos]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    dispatch(fetchTodosThunk(filter));
  };

  const handleClick = () => {
    if (userButtonRef.current && sidebarRef.current) {
      const sidebarRect =
        sidebarRef.current.getBoundingClientRect();

      setMenuPosition({
        bottom: window.innerHeight - sidebarRect.bottom,
        left: sidebarRect.right,
      });
    }

    setIsUserMenuOpen((prev) => !prev);
  };

  const canManageItems = user?.role === "user";

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
            <TaskMenu
              activeFilter={activeFilter}
              todoCounts={todoCounts}
              todoCountsLoading={todoCountsLoading}
              onFilterChange={handleFilterChange}
            />

            <ListMenu
              lists={lists}
              listsLoading={listsLoading}
              listsError={listsError}
              listCounts={listCounts}
              canManageItems={canManageItems}
              onAddList={() =>
                setIsAddListModalOpen(true)
              }
            />

            <TagMenu
              tags={tags}
              tagsLoading={tagsLoading}
              tagsError={tagsError}
              canManageItems={canManageItems}
              onAddTag={() =>
                setIsAddTagModalOpen(true)
              }
            />
          </div>

          <div className="sticky bottom-0 z-10 mt-auto px-5 py-3 border-t border-gray-200 flex flex-col gap-2 bg-white/95 backdrop-blur-md shrink-0">
            <div
              ref={userButtonRef}
              className="group w-full flex items-center gap-2 py-2 rounded-lg cursor-pointer transition-colors text-gray-900"
              onClick={handleClick}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-400 rounded-full text-white shrink-0">
                <User size={18} />
              </div>

              <div className="flex flex-col items-start flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-gray-900 leading-tight truncate">
                  {user?.name}
                </div>
              </div>

              <ChevronRight
                size={24}
                className={`text-gray-500 p-1 rounded shrink-0 transition-colors bg-indigo-50 group-hover:bg-indigo-100 group-hover:text-indigo-500 
                  ${isUserMenuOpen ? "bg-indigo-100" : ""}`}
              />
            </div>
          </div>
        </div>
      </aside>

      <UserMenu
        isOpen={isUserMenuOpen}
        menuPosition={menuPosition}
        onClose={() => setIsUserMenuOpen(false)}
        onOpenSettings={() =>
          setIsSettingsOpen(true)
        }
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() =>
          setIsSettingsOpen(false)
        }
      />
    </>
  );
}