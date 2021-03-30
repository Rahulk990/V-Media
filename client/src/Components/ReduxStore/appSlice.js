import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null,
        events: [],
        userPosts: [],
        rooms: [],
        activeUsers: []
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
            state.activeUsers = []
        },

        setEvents: (state, action) => {
            action.payload.sort((a, b) => a.timestamp - b.timestamp)
            state.events = action.payload;
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
        },
        
        appendUser: (state, action) => {
            state.activeUsers.push(action.payload)
        },

        popUser: (state, action) => {
            const ind = state.activeUsers.findIndex(obj => obj === action.payload)
            if (state.activeUsers[ind]) {
                state.activeUsers[ind] = state.activeUsers[state.activeUsers.length - 1]
                state.activeUsers.pop()
            }
        }
    },
});

export const { login, logout, setEvents, setRooms, appendRoom, popRoom, appendUser, popUser } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;
export const selectRooms = state => state.app.rooms;
export const selectActiveUsers = state => state.app.activeUsers;

export default appSlice.reducer;