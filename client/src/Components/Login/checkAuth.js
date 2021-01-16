import { auth } from '../../firebase'
import { login, logout } from '../ReduxStore/appSlice'
import fetchAllData from './fetchAllData'

const checkAuth = (dispatch) => {

    auth.onAuthStateChanged((authUser) => {
        if (authUser) {

            // Insert User Details into Redux Store
            dispatch(login({
                userId: authUser.uid,
                username: authUser.displayName,
                avatarSrc: authUser.photoURL
            }))

            // Fetch all related Data
            fetchAllData(dispatch, authUser.uid)

        } else {
            dispatch(logout())
        }
    })
}

export default checkAuth