import axios from '../Misc/axios'
import { updatePost } from '../ReduxStore/postSlice';

const removeLike = async (dispatch, userId, postId) => {
    await axios.get('/update/post/removeLike', { params: { userId: userId, postId: postId } })
        .then(res => dispatch(updatePost(res.data)))
}

export default removeLike