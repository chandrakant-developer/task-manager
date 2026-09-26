import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { TaskDetailsModal, DeleteItemModal, Spinner, TaskSidebar, TodoItemsLoader } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosThunk, createTodoThunk, updateTodoThunk, deleteTodoThunk, toggleTodoThunk } from "../store/thunks/todo.thunk";
import { handleDeleteItem, prepareDeleteItem } from "../helpers";
import { toast } from 'react-toastify';

export const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export function TaskPage() {
  const { todos, todoLoading, todosLoaded } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [showTodoLoader, setShowTodoLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosThunk("all"));
  }, [dispatch]);

  useEffect(() => {
    let timer;

    if (todoLoading) {
      timer = setTimeout(() => {
        setShowTodoLoader(true);
      }, 300);
    } else {
      setShowTodoLoader(false);
    }

    return () => clearTimeout(timer);
  }, [todoLoading]);

  function openCreatePanel() {
    setSelectedTask(null);
    setIsCreateMode(true);
    setIsDetailsPanelOpen(true);
  }

  const openTaskDetails = (todo) => {
    setSelectedTask(todo);
    setIsCreateMode(false);
    setIsDetailsPanelOpen(true);
  };

  async function handleToggleCompleted(todo) {
    try {
      const res = await dispatch(toggleTodoThunk(todo));
      toast.success(res?.message || "Task updated successfully");
    } catch (error) {
      console.error("Error updating todos", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to update task");
    }
  }

  async function handleSaveTask(id, taskData) {
    if (id === null) {
      try {
        const todoData = {
          ...taskData,
        }

        const res = await dispatch(createTodoThunk(todoData));
        toast.success(res?.message || "Task created successfully");
      } catch (error) {
        console.error("Error creating task", error);
        toast.error(error?.response?.data?.message || error?.message || "Failed to create task");
      }
    } else {
      try {
        console.log("taskData", taskData);

        const data = await dispatch(updateTodoThunk(id, taskData));
        toast.success(data?.message || "Task updated successfully");
      } catch (error) {
        console.error("Error updating task", error);
        toast.error(error?.response?.data?.message || error?.message || "Failed to update task");
      }
    }
  }

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        (todo.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (todo.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      if (filter === 'active') return matchesSearch && !todo.completed;
      if (filter === 'completed') return matchesSearch && todo.completed;

      return matchesSearch;
    });
  }, [todos, searchQuery, filter]);

  const showEmptyState =
    todosLoaded &&
    !todoLoading &&
    filteredTodos.length === 0;

  return (
    <div className="flex w-full h-full overflow-hidden min-w-0 box-border mb-4">
      <TaskSidebar />

      {showTodoLoader ? (
        <TodoItemsLoader />
      ) : (
        <div className="w-full max-w-full flex-[0_1_100%] min-w-0 h-[calc(100vh-1.25rem)] overflow-hidden pb-4">
          <div className="grid gap-6 w-full min-w-0 h-full box-border px-12 py-7">
            <div className="w-full min-w-0 bg-transparent shadow-none rounded-none">
              <div className="flex justify-start items-center mb-4 py-6 border-b border-gray-200 w-full max-w-full box-border">
                <h2 className='m-0 text-[2.5rem] flex items-center gap-3 font-semibold leading-none'>
                  <div> Tasks </div>

                  <div className="flex items-center justify-center gap-2 px-3 py-1 ml-3 bg-purple-400 text-white rounded-full text-sm font-medium shrink-0">
                    <div className="text-sm font-medium leading-none">
                      {todos.length}
                    </div>

                    <div className="text-sm font-medium uppercase tracking-wide">
                      Total
                    </div>
                  </div>
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-4 pb-5 border-b border-gray-200 w-full overflow-hidden overflow-x-auto md:overflow-visible">
                <div className="flex items-center gap-2 py-2 font-medium cursor-pointer transition-colors">
                  {FILTER_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      className={`inline-flex items-center gap-2 px-[1.5rem] py-[0.5rem] rounded-full border border-gray-300 text-[0.85rem] font-medium transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400
                        ${filter === option.id ? "bg-gray-600 text-white border-gray-600 hover:bg-gray-600 hover:text-white" : ""}`}
                      onClick={() => setFilter(option.id)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>

                <div className="w-px h-6 bg-gray-200 mx-2 shrink-0"></div>

                <div className="relative flex items-center shrink-0">
                  <Search
                    size={18}
                    className="absolute left-[0.9rem] text-gray-500 pointer-events-none w-[18px] h-[18px]"
                  />

                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="min-w-[300px] px-[1rem] py-[0.5rem] pl-10 bg-transparent border border-gray-300 rounded-full text-[0.85rem] text-gray-500 transition-all duration-200 focus:bg-indigo-50 focus:text-gray-500 focus:border-gray-400 focus:outline-none hover:bg-gray-50 hover:text-gray-500 hover:border-gray-400"
                  />
                </div>
              </div>

              {showEmptyState ? (
                <p className="flex items-center justify-center h-[250px] text-gray-500 text-center">
                  No tasks found
                </p>
              ) : (
                <ul className="custom-scroller list-none pt-1 pb-[100px] max-h-[calc(100vh-200px)] overflow-y-auto w-full box-border">
                  {filteredTodos.map((todo) => (
                    <li
                      key={todo._id}
                      className={`group flex items-center justify-between gap-3 px-2 py-3 border-b border-gray-200 last:border-b-0 w-full transition-colors hover:bg-indigo-50
                        ${selectedTask && selectedTask._id === todo._id ? 'bg-indigo-50 border-l-[5px] border-indigo-500 border-b-gray-200' : ''}`}
                    >
                      <div
                        className="flex items-start gap-3 flex-1 min-w-0"
                        onClick={() => openTaskDetails(todo)}
                        style={{ cursor: 'pointer' }}
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleCompleted(todo);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className='mt-[0.3rem] accent-indigo-500 w-[18px] h-[18px] cursor-pointer'
                        />

                        <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                          <div className={`font-semibold text-base leading-[1.4] break-words max-w-full
                            ${todo.completed ? 'line-through text-gray-500' : ''}`}
                          >
                            {todo.title}
                          </div>

                          {todo.description && (
                            <div className="text-sm text-gray-500 leading-[1.5] max-w-full truncate">
                              {todo.description}
                            </div>
                          )}
                        </div>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`text-gray-400 shrink-0 transition-transform hover:text-indigo-500 hover:translate-x-0.5 group-hover:text-indigo-500
                          ${selectedTask && selectedTask._id === todo._id ? 'text-indigo-500' : ''}`}
                        onClick={() => openTaskDetails(todo)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {!isCreateMode && (
            <button
              className={`fixed bottom-8 w-[56px] h-[56px] rounded-full bg-purple-500 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.4)] z-[999] transition-all duration-300 hover:bg-purple-600 hover:shadow-[0_6px_16px_rgba(99,102,241,0.5)] hover:-translate-y-[2px]
              ${isDetailsPanelOpen ? "right-[calc(400px+4rem)]" : "right-8"}`}
              onClick={openCreatePanel}
              type="button"
            >
              <Plus size={24} />
            </button>
          )}
        </div>
      )}

      <TaskDetailsModal
        isOpen={isDetailsPanelOpen}
        task={selectedTask}
        onClose={() => {
          setIsDetailsPanelOpen(false);
          setSelectedTask(null);
          setIsCreateMode(false);
        }}
        onSave={handleSaveTask}
        onDelete={(id) => {
          const todo = todos.find((t) => t._id === id);

          prepareDeleteItem({
            id,
            name: todo?.title,
            isDefault: false,
            defaultMessage: "",
            setItemToDelete: setTodoToDelete,
            setModalOpen: setIsDeleteModalOpen
          });
        }}
      />

      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        itemName={todoToDelete?.name}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTodoToDelete(null);
        }}
        onConfirm={() =>
          handleDeleteItem({
            dispatch,
            thunk: deleteTodoThunk,
            itemId: todoToDelete?.id,
            successMessage: "Task deleted successfully",
            errorMessage: "Failed to delete task",
            onSuccess: () => {
              setIsDeleteModalOpen(false);
              setTodoToDelete(null);
              setIsDetailsPanelOpen(false);
              setSelectedTask(null);
            }
          })
        }
      />
    </div>
  );
}