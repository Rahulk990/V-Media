import axios from "../Misc/axios"
import { setRooms } from "../ReduxStore/appSlice";

const fetchUserRooms = async (dispatch, userId) => {
    await axios.get('/retrieve/events', { params: { userId: userId } })
        .then(res => dispatch(setRooms(res.data.roomsArray)))
}

export default fetchUserRooms