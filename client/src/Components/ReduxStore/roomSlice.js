import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsData: [],
        currentRoom: null,
        messagesData: []
    },

    reducers: {
        setRoomsData: (state, action) => {
            state.roomsData = action.payload
        },

        appendRoomsData: (state, action) => {
            state.roomsData.push(action.payload)
        },
        
        setMessagesData: (state, action) => {
            state.messagesData = action.payload
        },

        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload
        }
    },
});

export const { setRoomsData, appendRoomsData, setMessagesData, setCurrentRoom } = roomSlice.actions;

export const selectRoomsData = state => state.room.roomsData;
export const selectCurrentRoom = state => state.room.currentRoom;
export const selectMessagesData = state => state.room.messagesData;

export default roomSlice.reducer;