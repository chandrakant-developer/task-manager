import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.lists = action.payload;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(
        (list) => list._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setList, addList, deleteList, setLoading, setError } = listSlice.actions;

export default listSlice.reducer;