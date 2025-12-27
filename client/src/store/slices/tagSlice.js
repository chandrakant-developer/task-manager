import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTagsAPI, createTagAPI, deleteTagAPI } from '../../services/api';

const getUserId = () => {
  return localStorage.getItem('userId') || null;
};

export const fetchTagsAsync = createAsyncThunk(
  'tags/fetchTags',
  async () => {
    const userId = getUserId();
    const response = await getTagsAPI(userId);
    return response;
  }
);

export const createTagAsync = createAsyncThunk(
  'tags/createTag',
  async (name) => {
    const userId = getUserId();
    const response = await createTagAPI(name, userId);
    return response;
  }
);

export const deleteTagAsync = createAsyncThunk(
  'tags/deleteTag',
  async (id) => {
    const userId = getUserId();
    await deleteTagAPI(id, userId);
    return id;
  }
);

const initialState = {
  tags: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTagAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(createTagAsync.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      .addCase(createTagAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTagAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTagAsync.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag._id !== action.payload);
      })
      .addCase(deleteTagAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;
