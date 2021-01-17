import axios from '../Misc/axios'

const addDirectRoom = async (queryData) => {
    await axios.post('/create/directRoom', queryData)
        .then((res) => { if (!res.data) alert('No such user exists!') })
}

export default addDirectRoom