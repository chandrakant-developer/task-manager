import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state, action) => {
            state.user = null,
            state.isAuthenticated = false;
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null,
//     isAuthenticated: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         clearUser: (state) => {
//             state.user = null;
//             state.isAuthenticated = false;
//         }
//     }
// });

// export const { setUser, clearUser } = authSlice.actions;

// export default authSlice.reducer;