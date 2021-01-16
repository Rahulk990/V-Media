import axios from '../Misc/axios'
import { setEvents } from '../ReduxStore/appSlice';

const uploadEvent = async (dispatch, data) => {
    await axios.post('/upload/event', data)
        .then(res => dispatch(setEvents(res.data.eventsArray)))
}

export default uploadEvent
