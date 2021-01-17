import fetchEvents from './fetchEvents'
import fetchUserPosts from './fetchUserPosts'
import fetchPosts from './fetchPosts'
import fetchUserRooms from './fetchUserRooms'

const fetchAllData = async (dispatch, userId, roomsData) => {
    await fetchEvents(dispatch, userId)

    await fetchUserPosts(dispatch, userId)
    await fetchPosts(dispatch)

    await fetchUserRooms(dispatch, userId)
}

export default fetchAllData;

