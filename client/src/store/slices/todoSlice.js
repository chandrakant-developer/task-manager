import { createSlice } from '@reduxjs/toolkit';
import { initialTodos } from '../../constants/initialData';

const initialState = {
    todos: initialTodos,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            console.log('After addTodo:', JSON.parse(JSON.stringify(state.todos)));
        },
        updateTodo: (state, action) => {
            const { id, updates } = action.payload;
            const index = state.todos.findIndex((todo) => todo._id === id);
            if (index !== -1) {
                state.todos[index] = { ...state.todos[index], ...updates };
            }
            console.log('After updateTodo:', JSON.parse(JSON.stringify(state.todos)));
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload);
            console.log('After deleteTodo:', JSON.parse(JSON.stringify(state.todos)));
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo._id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
            console.log('After toggleComplete:', JSON.parse(JSON.stringify(state.todos[index])));
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
