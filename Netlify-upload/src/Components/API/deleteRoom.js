import { popRoom } from "../ReduxStore/appSlice";
import { popRoomsData } from "../ReduxStore/roomSlice";

const deleteRoom = (dispatch, data) => {
    dispatch(popRoom(data))
    dispatch(popRoomsData(data))
}

export default deleteRoom
