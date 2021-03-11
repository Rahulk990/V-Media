import axios from '../Misc/axios'
import { setUserPosts } from '../ReduxStore/appSlice';

const uploadPost = async (dispatch, postData) => {
    await axios.post('/upload/post', postData)
        .then(res => dispatch(setUserPosts(res.data.postsArray)))
}

export default uploadPost
