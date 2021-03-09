import axios from "../Misc/axios"
import { setRooms } from "../ReduxStore/appSlice";
import fetchRoomsData from './fetchRoomsData'

const fetchUserRooms = async (dispatch, userId) => {
    await axios.get('/retrieve/events', { params: { userId: userId } })
        .then(res => {
            const data = res.data.roomsArray
            dispatch(setRooms(data))
            fetchRoomsData(dispatch, data)            
        })
}

export default fetchUserRooms