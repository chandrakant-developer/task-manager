import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [
    { _id: "1", name: "Personal", isDefault: true },
    { _id: "2", name: "Work", isDefault: true },
    { _id: "3", name: "Shopping", isDefault: true },
    { _id: "4", name: "Health", isDefault: true },
    { _id: "5", name: "Travel", isDefault: true }
  ],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        _id: Date.now().toString(),
        name: action.payload
      };
      state.lists.push(newList);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(
        (list) => list._id !== action.payload
      );
    }
  }
});

export const { addList, deleteList } = listSlice.actions;

export default listSlice.reducer;