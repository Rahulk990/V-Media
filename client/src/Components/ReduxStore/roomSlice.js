import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsArray: [
            {
                _id: '123123',
                title: null,
                usersArray: [],
                messagesArray: []
            },
            {
                _id: '123412314',
                title: 'Groups2',
                usersArray: [],
                messagesArray: []
            }
        ]
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