import mongoose from "mongoose";

const postModel = mongoose.Schema({
	userId: String,
	username: String,
	imgName: String,
	text: String,
	avatar: String,
	timestamp: String,
});

export default mongoose.model("posts", postModel);
