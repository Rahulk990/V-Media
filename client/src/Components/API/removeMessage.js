import axios from '../Misc/axios'

const removeMessage = (roomId, messageId) => {
    axios.get('/delete/message', { params: { roomId: roomId, messageId: messageId } })
}

export default removeMessage