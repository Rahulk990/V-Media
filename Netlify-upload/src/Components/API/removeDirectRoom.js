import axios from "../Misc/axios";

const removeDirectRoom = (roomId) =>{
	 axios.get("/update/room/removeDirectRoom", { params: { roomId: roomId } })
}

export default removeDirectRoom