import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTag: (state, action) => {
      state.tags = action.payload;
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter(
        (tag) => tag._id !== action.payload
      );
    }
  }
});

export const { setTag, addTag, deleteTag } = tagSlice.actions;

export default tagSlice.reducer;
