import axios from '../Misc/axios'

const addGroupRoom = async (queryData) => {
    await axios.post('/create/groupRoom', queryData)
}

export default addGroupRoom