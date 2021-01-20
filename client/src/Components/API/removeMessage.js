import axios from '../Misc/axios'

const removeMessage = async (roomId, messageId) => {
    await axios.get('/delete/message', { params: { roomId: roomId, messageId: messageId } })
}

export default removeMessage