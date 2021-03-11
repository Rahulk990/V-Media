import axios from '../Misc/axios'
import { updatePost } from '../ReduxStore/postSlice';

const removeComment = async (dispatch, postId, commentId) => {
    await axios.get('/update/post/removeComment', { params: { postId: postId, commentId: commentId } })
        .then(res => dispatch(updatePost(res.data)))
}

export default removeComment