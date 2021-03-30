import { setEvents } from '../ReduxStore/appSlice'
import { setPosts } from '../ReduxStore/postSlice';
import fetchPosts from './fetchPosts'

const fetchData = async (userId, dispatch, getEvents, getPosts) => {

    // Fetching Events
    const events = await getEvents({ variables: { id: userId } });
    dispatch(setEvents(events.data.user.eventsArray));

    // Fetching Posts
    await fetchPosts(dispatch, getPosts);

    // fetchUserRooms(dispatch, userId)
}

export default fetchData;

