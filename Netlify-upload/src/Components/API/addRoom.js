import { appendRoom } from "../ReduxStore/appSlice";
import { appendRoomsData } from "../ReduxStore/roomSlice";

const addRoom = (dispatch, data, userId) => {
    if (data.usersArray.includes(userId)) {
        dispatch(appendRoom(data._id))
        dispatch(appendRoomsData(data))
    }
}

export default addRoom
