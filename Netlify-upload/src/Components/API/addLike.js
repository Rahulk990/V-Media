import axios from '../Misc/axios'
import { updatePost } from '../ReduxStore/postSlice';

const addLike = async (dispatch, userId, postId) => {
    await axios.get('/update/post/addLike', { params: { userId: userId, postId: postId } })
        .then(res => dispatch(updatePost(res.data)))
}

export default addLike