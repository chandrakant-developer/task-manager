import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodosAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from '../../services/api';

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await getTodosAPI();
        return response;
    }
);

export const createTodosAsync = createAsyncThunk(
    'todos/createTodos',
    async (todoData) => {
        const response = await createTodoAPI(todoData);
        return response;
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, updates }) => {
        const response = await updateTodoAPI(id, updates);
        return response;
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
        const response = await deleteTodoAPI(id);
        return response;
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleComplete',
    async ({ id, currentCompleted }) => {
        const response = await updateTodoAPI(id, { completed: !currentCompleted });
        return response;
    }
);

const initialState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTodosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTodosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.unshift(action.payload);
            })
            .addCase(createTodosAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTodoAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const deletedId = action.meta.arg;
                state.todos = state.todos.filter((todo) => todo._id !== deletedId);
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(toggleCompleteAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(toggleCompleteAsync.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default todoSlice.reducer;
