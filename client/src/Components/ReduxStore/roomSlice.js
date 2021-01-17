import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsData: null
    },

    reducers: {
        setRoomsData: (state, action) => {
            state.roomsArray = action.payload
        },

        appendRoomsData: (state, action) => {
            state.posts.push(action.payload)
        }
    },
});

export const { setRoomsData, appendRoomsData } = roomSlice.actions;

export const selectRoomsData = state => state.room.roomsData;

export default roomSlice.reducer;