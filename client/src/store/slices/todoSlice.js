import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [
        {
            _id: "1",
            title: "Review code changes",
            description: "Go through all the recent commits and review the code quality, check for improvements.",
            completed: false,
            list: "Personal",
            tags: ["Important", "Planning"],
            dueDate: "2026-01-05",
        },
        {
            _id: "2",
            title: "Update project documentation",
            description: "Write comprehensive documentation for the project including setup instructions.",
            completed: false,
            list: "Work",
            tags: ["Important", "In Progress"],
            dueDate: "2026-03-12",
        },
        {
            _id: "3",
            title: "Team Meeting Preparation",
            description: "Prepare agenda and materials for the weekly team sync meeting",
            completed: false,
            list: "Health",
            tags: ["Planning", "Important"],
            dueDate: "2026-04-28",
        },
        {
            _id: "4",
            title: "Deploy to production",
            description: "Deploy the latest version to production environment and verify all services.",
            completed: false,
            list: "Work",
            tags: ["Important"],
            dueDate: "2025-12-29",
        },
        {
            _id: "5",
            title: "Deploy to production",
            description: "Deploy the latest version to production environment and verify all services.",
            completed: false,
            list: "Health",
            tags: ["Planning", "Important"],
            dueDate: "2025-12-28",
        }
    ],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.unshift({
                _id: Date.now().toString(),
                completed: false,
                ...action.payload
            });
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

export const { addTodo, updateTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;