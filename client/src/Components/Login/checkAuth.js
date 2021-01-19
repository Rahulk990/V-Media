import { auth } from "../../firebase";
import { login, logout } from "../ReduxStore/appSlice";

const checkAuth = (dispatch, history) => {
	auth.onAuthStateChanged((authUser) => {
		if (authUser) {
			// Insert User Details into Redux Store
			dispatch(
				login({
					userId: authUser.uid,
					username: authUser.displayName,
					avatarSrc: authUser.photoURL,
				})
			);

			// Redirect to Home
			history.replace("/home");
		} else {
			dispatch(logout());
			history.replace("/login");
		}
	});
};

export default checkAuth;
