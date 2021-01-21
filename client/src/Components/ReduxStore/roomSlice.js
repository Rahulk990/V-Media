import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsData: []
    },

    reducers: {
        setRoomsData: (state, action) => {
            state.roomsData = action.payload
        },

        appendRoomsData: (state, action) => {
            state.roomsData.push(action.payload)
        },

        updateRoomData: (state, action) => {
            const ind = state.roomsData.findIndex(obj => obj._id === action.payload._id)
            if (state.roomsData[ind]) state.roomsData[ind] = action.payload
        }
    },
});

export const { setRoomsData, appendRoomsData, updateRoomData, setMessagesData, setCurrentRoom } = roomSlice.actions;

export const selectRoomsData = state => state.room.roomsData;

export default roomSlice.reducer;