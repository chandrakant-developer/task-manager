import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        
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

export const { addTodo, setTodos, updateTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;