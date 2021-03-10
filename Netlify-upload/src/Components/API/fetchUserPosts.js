import axios from "../Misc/axios"
import { setUserPosts } from "../ReduxStore/appSlice";

const fetchUserPosts = async (dispatch, userId) => {
    await axios.get('/retrieve/userPosts', { params: { userId: userId } })
        .then(res => dispatch(setUserPosts(res.data.postsArray)))

}

export default fetchUserPosts