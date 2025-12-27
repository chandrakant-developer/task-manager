import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListsAPI, createListAPI, deleteListAPI } from '../../services/api';

const getUserId = () => {
  return localStorage.getItem('userId') || null;
};

export const fetchListsAsync = createAsyncThunk(
  'lists/fetchLists',
  async () => {
    const userId = getUserId();
    const response = await getListsAPI(userId);
    return response;
  }
);

export const createListAsync = createAsyncThunk(
  'lists/createList',
  async (name) => {
    const userId = getUserId();
    const response = await createListAPI(name, userId);
    return response;
  }
);

export const deleteListAsync = createAsyncThunk(
  'lists/deleteList',
  async (id) => {
    const userId = getUserId();
    await deleteListAPI(id, userId);
    return id;
  }
);

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchListsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchListsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createListAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(createListAsync.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(createListAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteListAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteListAsync.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list._id !== action.payload);
      })
      .addCase(deleteListAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;
