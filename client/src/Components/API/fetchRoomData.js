import axios from "../Misc/axios"
import { appendRoomsData } from "../ReduxStore/roomSlice";

const fetchRoomData = async (dispatch, roomId) => {
    await axios.get('retrieve/roomData', { params: { postId: roomId } })
        .then(res => dispatch(appendRoomsData(res.data)))

}

const fetchRoomsData = async (dispatch, roomsData) => {
    roomsData.forEach(roomId => {
        fetchRoomData(dispatch, roomId)
    })
}

export default fetchRoomsData