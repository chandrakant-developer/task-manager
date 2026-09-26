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
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setTag, addTag, deleteTag, setLoading, setError } = tagSlice.actions;

export default tagSlice.reducer;
