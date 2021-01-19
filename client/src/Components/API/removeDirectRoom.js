import axios from "../Misc/axios";

const removeDirectRoom = (userId, roomId) =>{
    console.log(userId, roomId, "inside API");
	 axios
		.get("/update/room/removeDirectRoom", { params: { userId: userId, roomId: roomId } })
		.then((res) => {
			// if (!res.data) alert("No such user exists!");
		});
}

export default removeDirectRoom