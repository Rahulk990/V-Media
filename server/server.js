// Importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import * as socketIo from "socket.io";
import dotenv from "dotenv";
// import Pusher from "pusher";

import eventRoutes from "./Routes/eventRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import roomRoutes from "./Routes/roomRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Listener
const server = app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});


// Socket Setup
const io = new socketIo.Server(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("User Connected");

	socket.on("disconnect", () => {
		console.log("User Disconnected");
	});
});


// DB Config
const mongoURI = process.env.URI;
mongoose.connect(mongoURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


mongoose.connection.once("open", () => {
	console.log("DB Connected");

	const changeStream = mongoose.connection.collection("posts").watch();
	changeStream.on("change", (change) => {
		if (
			change.operationType === "insert" ||
			change.operationType === "delete"
		) {
			io.emit("refresh", { body: "DB Changed" });
		} else {
			console.log("Error Triggering Socket");
		}
	});

	// const changeStream1 = mongoose.connection.collection("rooms").watch();
	// changeStream1.on("change", (change) => {
	// 	if (change.operationType === "insert" ||
	// 		(change.operationType === "update" && change.updateDescription.updatedFields.usersArray))
	// 		pusher.trigger("messages", "inserted", "Update Rooms");

	// 	if (change.operationType === "update") {
	// 		pusher.trigger("messages", "updated", change.documentKey._id);
	// 	}

	// });
});


// API Routes
app.use(eventRoutes);
app.use(postRoutes);
app.use(roomRoutes);
app.use(userRoutes);
