import fetchEvents from '../API/fetchEvents'
import fetchUserPosts from '../API/fetchUserPosts'
import fetchPosts from '../API/fetchPosts'

const fetchAllData = async (dispatch, userId) => {
    await fetchEvents(dispatch, userId)
    await fetchUserPosts(dispatch, userId)
    await fetchPosts(dispatch)
}

export default fetchAllData;

