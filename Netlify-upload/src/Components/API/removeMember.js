import axios from "../Misc/axios";

const removeMember = (userId, roomId) => {
	 axios
		.get("/update/room/removeMember", { params: { userId: userId, roomId: roomId } })
		.then((res) => {if (!res.data) alert("No such user exists!")});
}

export default removeMember;