import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsArray: null
    },

    reducers: {
        setData: (state, action) => {
            state.roomsArray = action.payload
        }
    },
});

export const { setData } = roomSlice.actions;

export const getRooms = state => state.room.roomsArray;

export default roomSlice.reducer;