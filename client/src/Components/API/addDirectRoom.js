import axios from '../Misc/axios'

const addDirectRoom = async (queryData) => {
    await axios.post('/create/directRoom', queryData)
        .then((res) => { 
            if (!res.data) alert('No such user exists!');
            else if (res.data === 'Same User') alert('Kaan pe marunga');
        })
}

export default addDirectRoom