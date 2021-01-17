import axios from "../Misc/axios"
import { setMessagesData } from "../ReduxStore/roomSlice";

const fetchMessages = async (dispatch, history, roomId) => {
    await axios.get('retrieve/messages', { params: { roomId: roomId } })
        .then((res) => {
            if (res.data) {
                res.data.messagesArray.sort((a, b) => { return b.timestamp - a.timestamp })
                dispatch(setMessagesData(res.data.messagesArray))
            }
            else {
                dispatch(setMessagesData([]))
                history.replace('/messenger')
            }

        })

}

export default fetchMessages