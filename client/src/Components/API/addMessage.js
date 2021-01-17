import axios from '../Misc/axios'

const addMessage = async (requestData) => {
    await axios.post('/upload/message', requestData)
    console.log('Message Added')
}

export default addMessage