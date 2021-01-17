import fetchEvents from '../API/fetchEvents'
import fetchUserPosts from '../API/fetchUserPosts'
import fetchPosts from '../API/fetchPosts'
import fetchRooms from '../API/fetchRooms'

const fetchAllData = async (dispatch, userId) => {
    await fetchEvents(dispatch, userId)
    await fetchUserPosts(dispatch, userId)
    await fetchRooms(dispatch, userId)
    
    await fetchPosts(dispatch)
}

export default fetchAllData;

