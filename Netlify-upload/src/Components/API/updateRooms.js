import axios from "../Misc/axios"
import { appendRoom, popRoom } from "../ReduxStore/appSlice";
import { appendRoomsData, popRoomsData } from "../ReduxStore/roomSlice";

const updateRooms = async (dispatch, userRooms, data, userId) => {
    if (typeof (data.usersArray) === 'string' && data.usersArray == userId) {
        dispatch(appendRoom(data.roomId))
        axios.get('retrieve/roomData', { params: { roomId: data.roomId } })
            .then(res => dispatch(appendRoomsData(res.data)))
    } else if (typeof (data.usersArray) !== 'string' && userRooms.includes(data.roomId) && !data.usersArray.includes(userId)) {
        dispatch(popRoom(data))
        dispatch(popRoomsData(data))
    }
}

export default updateRooms