import axios from "../Misc/axios";

const addMember = (email, roomId) => {
	axios.get("/update/room/addMember", { params: { email: email, roomId: roomId } })
		.then((res) => {
			if (!res.data) alert("No such user exists!");
			else if (res.data === 'Error') alert("User is already present in the Group");
		});
};

export default addMember;
