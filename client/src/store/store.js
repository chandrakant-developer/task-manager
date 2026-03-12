import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './slices/listSlice';
import tagsReducer from './slices/tagSlice';
import todoReducer from './slices/todoSlice';

const store = configureStore({
    reducer: {
        lists: listsReducer,
        tags: tagsReducer,
        tasks: todoReducer,
    },
});

export default store;