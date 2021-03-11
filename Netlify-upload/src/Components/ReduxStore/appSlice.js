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
            state.events = action.payload;
        },

        setUserPosts: (state, action) => {
            state.userPosts = action.payload
        },

        setRooms: (state, action) => {
            action.payload.sort((a, b) => a._id - b._id)
            if (!(state.rooms.length === action.payload.length &&
                state.rooms.every((v, i) => v === action.payload[i]))) {
                state.rooms = action.payload
            }
        },

        appendRoom: (state, action) => {
            state.rooms.push(action.payload)
        },

        popRoom: (state, action) => {
            const ind = state.rooms.findIndex(obj => obj === action.payload.roomId)
            if (state.rooms[ind]) {
                state.rooms[ind] = state.rooms[state.rooms.length - 1]
                state.rooms.pop()
            }
        }
    },
});

export const { login, logout, setEvents, setUserPosts, setRooms, appendRoom, popRoom } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;
export const selectPosts = state => state.app.userPosts;
export const selectRooms = state => state.app.rooms;

export default appSlice.reducer;