import mongoose from "mongoose";
const commentModel = mongoose.Schema({
	content:String, 
	userId:String
})
const postModel = mongoose.Schema({
	userId: String,
	username: String,
	imgName: String,
	text: String,
	avatar: String,
	timestamp: String,
	likesArray:[String], 
	commentsArray:[commentModel]
});

export default mongoose.model("posts", postModel);
