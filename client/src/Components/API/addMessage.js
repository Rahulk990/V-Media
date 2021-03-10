import axios from '../Misc/axios'

const addMessage = (requestData) => {
    axios.post('/upload/message', requestData)
}

export default addMessage