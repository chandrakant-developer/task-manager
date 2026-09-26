import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    todoCounts: {
        today: 0,
        upcoming: 0,
        completed: 0,
        starred: 0,
    },
    todoLoading: false,
    todoCountsLoading: false,
    todosLoaded: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },

        setTodoLoading: (state, action) => {
            state.todoLoading = action.payload;
        },

        setTodosLoaded: (state, action) => {
            state.todosLoaded = action.payload;
        },

        setTodoCounts: (state, action) => {
            state.todoCounts = action.payload;
        },

        setTodoCountsLoading: (state, action) => {
            state.todoCountsLoading = action.payload;
        },

        addTodo: (state, action) => {
            if (!action.payload) return;
            state.todos.unshift(action.payload);
        },

        updateTodo: (state, action) => {
            const index = state.todos.findIndex(
                (todo) => todo._id === action.payload._id
            );

            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    ...action.payload
                };
            }
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo._id !== action.payload
            );
        },

        toggleTodo: (state, action) => {
            const todo = state.todos.find(
                (todo) => todo._id === action.payload
            );

            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
});

export const {
    addTodo,
    setTodos,
    setTodoLoading,
    setTodosLoaded,
    setTodoCounts,
    setTodoCountsLoading,
    updateTodo,
    deleteTodo,
    toggleTodo
} = todoSlice.actions;

export default todoSlice.reducer;