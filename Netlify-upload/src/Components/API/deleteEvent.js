import axios from '../Misc/axios'
import { setEvents } from '../ReduxStore/appSlice';

const deleteEvent = async (dispatch, userId, eventId) => {
    await axios.get('/delete/event', { params: { userId: userId, eventId: eventId } })
        .then(res => dispatch(setEvents(res.data.eventsArray)))
}

export default deleteEvent
