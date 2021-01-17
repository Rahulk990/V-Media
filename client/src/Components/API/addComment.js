import axios from '../Misc/axios'
import { updatePost } from '../ReduxStore/postSlice';

const addComment = async (dispatch, requestData) => {
    await axios.post('/update/post/addComment', requestData)
        .then(res => dispatch(updatePost(res.data)))
}

export default addComment