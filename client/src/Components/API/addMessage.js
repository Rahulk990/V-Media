import axios from '../Misc/axios'

const addMessage = async (requestData) => {
    await axios.post('/upload/message', requestData)
}

export default addMessage