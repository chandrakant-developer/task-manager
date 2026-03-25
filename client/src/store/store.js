import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import listsReducer from './slices/listSlice';
import tagsReducer from './slices/tagSlice';
import todoReducer from './slices/todoSlice';

const store = configureStore({
    reducer: {
        user: authReducer,
        lists: listsReducer,
        tags: tagsReducer,
        tasks: todoReducer,
    },
});

export default store;