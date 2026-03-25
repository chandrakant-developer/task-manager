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
    }
  }
});

export const { setList, addList, deleteList } = listSlice.actions;

export default listSlice.reducer;