import axios from "../Misc/axios";

const removeDirectRoom = (userId, roomId) =>{
	 axios.get("/update/room/removeDirectRoom", { params: { userId: userId, roomId: roomId } })
}

export default removeDirectRoom