import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todoSlice';
import listsReducer from './slices/listSlice';
import tagsReducer from './slices/tagSlice';

const store = configureStore({
    reducer: {
        todos: todosReducer,
        lists: listsReducer,
        tags: tagsReducer,
    },
});

export default store;
