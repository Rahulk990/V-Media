import axios from "../Misc/axios";

import { setRooms } from "../ReduxStore/appSlice";
const addMember = async (dispatch, email, roomId) => {
	console.log(email, roomId);
	await axios
		.get("/update/room/addMember", { params: { email: email, roomId: roomId } })
		.then((res) => {
			if (!res.data) alert("No such user exists!");
			// else {
			// 	dispatch(setRooms(res.data));
			// }
		});
};

export default addMember;
