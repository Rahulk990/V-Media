import axios from "../Misc/axios"
import { appendRoomsData, setRoomsData } from "../ReduxStore/roomSlice";

const fetchRoomData = async (dispatch, roomId) => {
    axios.get('retrieve/roomData', { params: { roomId: roomId } })
        .then(res => dispatch(appendRoomsData(res.data)))

}

const fetchRoomsData = async (dispatch, roomsData) => {
    await dispatch(setRoomsData([]))
    roomsData.forEach(roomId => {
        fetchRoomData(dispatch, roomId)
    })
}

export default fetchRoomsData