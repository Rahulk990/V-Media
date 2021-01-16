import axios from "../../Misc/axios"
import { auth, provider } from "../../../firebase"


const createUser = async () => {

    // Do Authentication using Firebase
    await auth.signInWithPopup(provider)
        .then(result => {

            const userData = {
                userId: result.user.uid,
                name: result.user.displayName,
                avatar: result.user.photoURL,
                email: result.user.email
            }

            // Send Data to Database
            saveData(userData)
        })
        .catch(err => console.log(err.message))
}

const saveData = async (userData) => {
    await axios.post('/upload/user', userData)
}

export default createUser