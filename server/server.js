// Importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import * as socketIo from "socket.io";
import Pusher from "pusher";

import eventRoutes from "./Routes/eventRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import roomRoutes from "./Routes/roomRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

import mongoPosts from "./Models/mongoPosts.js";
import mongoUsers from "./Models/mongoUsers.js";
import mongoRooms from "./Models/mongoRooms.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;

// -----pusher-------
const pusher = new Pusher({
	appId: "1138234",
	key: "d24ba3df0d30f4d2c95e",
	secret: "e367a842ed6aa6866991",
	cluster: "ap2",
	useTLS: true,
});

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
const mongoURI =
	"mongodb+srv://admin:KsDmm1u8B2RKgKCj@cluster0.f9hlo.mongodb.net/fbdb?retryWrites=true&w=majority";
mongoose.set("useFindAndModify", false);

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

	const changeStream1 = mongoose.connection.collection("rooms").watch();
	changeStream1.on("change", (change) => {
		if (change.operationType === "insert" ||
			(change.operationType === "update" && change.updateDescription.updatedFields.usersArray))
			pusher.trigger("messages", "inserted", "Update Rooms");

		if (change.operationType === "update") {
			pusher.trigger("messages", "updated", change.documentKey._id);
		}

	});
});

// API Routes
app.use(eventRoutes);
app.use(postRoutes);
app.use(roomRoutes);
app.use(userRoutes);
