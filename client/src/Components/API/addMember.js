import axios from "../Misc/axios";

const addMember = async (email, roomId) => {
	console.log(email, roomId);
	await axios.get("/update/room/addMember", { params: { email: email, roomId: roomId } })
		.then((res) => {
			if (!res.data) alert("No such user exists!");
			else if(res.data === 'Error')  alert("Kyu bar bar dalrela hain");
		});
};

export default addMember;
