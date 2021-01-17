import fetchEvents from './fetchEvents'
import fetchUserPosts from './fetchUserPosts'
import fetchPosts from './fetchPosts'
import fetchRooms from './fetchRooms'
import fetchRoomsData from './fetchRoomData'

const fetchAllData = async (dispatch, userId, roomsData) => {
    await fetchEvents(dispatch, userId)
    await fetchUserPosts(dispatch, userId)
    await fetchRooms(dispatch, userId)
    
    await fetchPosts(dispatch)
    await fetchRoomsData(dispatch, roomsData)
}

export default fetchAllData;

