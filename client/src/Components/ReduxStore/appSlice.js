import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null
    },

    reducers: {
        login: (state, action) => {
            state.user = {
                userId: action.payload.userId,
                username: action.payload.username,
                avatarSrc: action.payload.avatarSrc
            }
        },
        logout: (state) => {
            state.user = null
        },
    },
});

export const { login, logout } = appSlice.actions;

export const selectUser = state => state.app.user;

export default appSlice.reducer;