import fetchEvents from './fetchEvents'
import fetchUserPosts from './fetchUserPosts'
import fetchPosts from './fetchPosts'
import fetchUserRooms from './fetchUserRooms'

const fetchAllData = async (dispatch, userId) => {
    fetchEvents(dispatch, userId)

    fetchUserPosts(dispatch, userId)
    fetchPosts(dispatch)

    fetchUserRooms(dispatch, userId)
}

export default fetchAllData;

