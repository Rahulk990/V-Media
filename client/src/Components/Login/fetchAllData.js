import fetchEvents from './API/fetchEvents'

const fetchAllData = async (dispatch, userId) => {
    await fetchEvents(dispatch, userId)
}

export default fetchAllData;

