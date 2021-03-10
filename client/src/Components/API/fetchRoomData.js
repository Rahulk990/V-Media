import axios from "../Misc/axios"
import { updateRoomData } from "../ReduxStore/roomSlice";

const fetchRoomData = async (dispatch, userRooms, roomId) => {
    if (userRooms.includes(roomId)) {
        await axios.get('retrieve/roomData', { params: { roomId: roomId } })
            .then(res => dispatch(updateRoomData(res.data)))
    }
}

export default fetchRoomData