import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settings: null,
    sessions: [],
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        },

        setSessions: (state, action) => {
            state.sessions = action.payload;
        },

        removeSession: (state, action) => {
            state.sessions = state.sessions.filter(
                (session) => session._id !== action.payload
            );
        },

        setUserLoading: (state, action) => {
            state.loading = action.payload;
        },

        clearUserData: (state) => {
            state.settings = null;
            state.sessions = [];
        },
    }
});

export const { setSettings, setSessions, removeSession, setUserLoading, clearUserData } = userSlice.actions;
export default userSlice.reducer;