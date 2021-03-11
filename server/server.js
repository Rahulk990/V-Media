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

const users = []
io.on("connection", (socket) => {
	console.log("User Connected");
	socket.emit("Welcome", users)

	socket.on("Joined", (data) => {
		socket.join("Users");
		users.push({
			socketId: socket.id,
			userId: data
		})

		io.sockets.in("Users").emit("Someone Connected", data);
	});

	socket.on("disconnect", () => {
		socket.leave("Users");

		const ind = users.findIndex(obj => obj.socketId === socket.id)
		io.sockets.in("Users").emit("Someone Disconnected", users[ind].userId);
		users.splice(ind, 1)

		console.log("User Disconnected");
	});
});

// DB Config
const mongoURI = process.env.URI;
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
		if (change.operationType === "insert" || change.operationType === "delete") {
			io.sockets.emit("refresh", { body: "DB Changed" });
		}
	});

	const changeStream1 = mongoose.connection.collection("rooms").watch();
	changeStream1.on("change", (change) => {

		if (change.operationType == 'insert') {
			io.sockets.emit("New Room Created", change.fullDocument)
		}

		if (change.operationType == 'delete') {
			io.sockets.emit("Room Deleted", change.documentKey)
		}

		if (change.operationType == 'update') {
			for (let x in change.updateDescription.updatedFields) {
				if (x.substring(0, 13) == 'messagesArray') {
					io.sockets.emit("message", change.documentKey._id)
				}
				if (x.substring(0, 10) == 'usersArray') {
					const data = {
						roomId: change.documentKey._id,
						usersArray: change.updateDescription.updatedFields[x]
					}
					io.sockets.emit("users", data)
				}
			}
		}
	})
});


// API Routes
app.use(eventRoutes);
app.use(postRoutes);
app.use(roomRoutes);
app.use(userRoutes);

