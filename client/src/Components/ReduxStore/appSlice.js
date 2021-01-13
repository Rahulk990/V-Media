import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        userId: '',
        username: 'User Name Long',
        avatarSrc: 'are'
    },

    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.avatarSrc = action.payload.avatarSrc
        },
        logout: (state) => {
            state.userId = ''
            state.username = ''
            state.avatarSrc = ''
        },
    },
});

export const {login, logout} = appSlice.actions;

export const selectUser = state => [state.app.userId, state.app.username, state.app.avatarSrc];

export default appSlice.reducer;