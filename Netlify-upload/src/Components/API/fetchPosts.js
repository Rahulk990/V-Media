import axios from "../Misc/axios"
import { setPosts } from "../ReduxStore/postSlice";

const fetchPosts = async (dispatch) => {
    await axios.get('retrieve/posts')
        .then(res => dispatch(setPosts(res.data)))

}

export default fetchPosts