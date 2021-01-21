import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null,
        events: [],
        userPosts: [],
        rooms: []
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
            action.payload.sort((a, b) => a.timestamp - b.timestamp)
            state.events = action.payload
        },

        setUserPosts: (state, action) => {
            state.userPosts = action.payload
        },

        setRooms: (state, action) => {
            action.payload.sort((a, b) => a._id - b._id)
            state.rooms = action.payload
        }
    },
});

export const { login, logout, setEvents, setUserPosts, setRooms } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;
export const selectPosts = state => state.app.userPosts;
export const selectRooms = state => state.app.rooms;

export default appSlice.reducer;