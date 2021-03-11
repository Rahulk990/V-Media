import axios from "../Misc/axios"
import { updatePost } from "../ReduxStore/postSlice";

const fetchPosts = async (dispatch, postId) => {
    await axios.get('retrieve/postData', { params: { postId: postId } })
        .then(res => dispatch(updatePost(res.data)))

}

export default fetchPosts