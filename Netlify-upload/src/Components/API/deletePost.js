import axios from '../Misc/axios'
import { setUserPosts } from '../ReduxStore/appSlice';

const deletePost = async (dispatch, userId, postId) => {
    await axios.get('/delete/post', { params: { userId: userId, postId: postId } })
        .then(res => dispatch(setUserPosts(res.data.postsArray)))
}

export default deletePost
