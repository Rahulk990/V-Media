import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null,
        events: null,
        rooms: null
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
        },

        setEvents: (state, action) => {
            state.events = action.payload
        }
    },
});

export const { login, logout, setEvents } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;

export default appSlice.reducer;