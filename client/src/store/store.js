import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import listsReducer from './slices/list.slice';
import tagsReducer from './slices/tag.slice';
import todoReducer from './slices/todo.slice';

const store = configureStore({
    reducer: {
        user: authReducer,
        lists: listsReducer,
        tags: tagsReducer,
        todos: todoReducer,
    },
});

export default store;