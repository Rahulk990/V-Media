import {configureStore} from '@reduxjs/toolkit';
import appReducer from './appSlice'
import roomReducer from './roomSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        room: roomReducer
    },
});