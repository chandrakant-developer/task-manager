import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [
    { _id: "1", name: "Important", isDefault: true },
    { _id: "2", name: "Low Priority", isDefault: true },
    { _id: "3", name: "In Progress", isDefault: true },
    { _id: "4", name: "Blocked", isDefault: true },
    { _id: "5", name: "Planning", isDefault: true }
  ]
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      const newTag = {
        _id: Date.now().toString(),
        name: action.payload
      };
      state.tags.push(newTag);
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter(
        (tag) => tag._id !== action.payload
      );
    }
  }
});

export const { addTag, deleteTag } = tagSlice.actions;

export default tagSlice.reducer;
