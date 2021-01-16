import axios from "../Misc/axios"
import { setEvents } from "../ReduxStore/appSlice";

const fetchEvents = async (dispatch, userId) => {
    await axios.get('/retrieve/events', { params: { userId: userId } })
        .then(res => dispatch(setEvents(res.data.eventsArray)))

}

export default fetchEvents