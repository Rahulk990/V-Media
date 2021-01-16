import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null,
        events: [],
        userPosts: [],
        userRooms: []
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
            state.events = []
            state.rooms = []
            state.userPosts = []
        },

        setEvents: (state, action) => {
            state.events = action.payload
        },

        setUserPosts: (state, action) => {
            state.userPosts = action.payload
        }
    },
});

export const { login, logout, setEvents, setUserPosts } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;
export const selectPosts = state => state.app.userPosts;

export default appSlice.reducer;