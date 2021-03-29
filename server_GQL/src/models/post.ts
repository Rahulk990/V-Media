import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
});

const postSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.String, required: true },
  text: { type: mongoose.SchemaTypes.String, required: true },
  imgUrl: { type: mongoose.SchemaTypes.String, required: false },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
  likesArray: { type: [mongoose.SchemaTypes.String] },
  commentsArray: { type: [commentSchema] },
});

export default mongoose.model("Post", postSchema);
