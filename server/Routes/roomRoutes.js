import express from "express";
import mongoUsers from "../Models/mongoUsers.js";
import mongoRooms from "../Models/mongoRooms.js";

const router = express.Router();

// Create New Direct Room
router.post("/create/directRoom", (req, res) => {
	mongoUsers.findOne({ email: req.body.userEmail }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else if (data === null) {
			res.send(data);
		} else if (data.userId === req.body.userId) {
			res.send("Same User");
		} else {
			const roomData = { usersArray: [req.body.userId, data.userId] };
			mongoRooms.create(roomData, (err2, data2) => {
				if (err2) {
					res.status(500).send(err2);
				} else {
					const roomId = data2._id;
					mongoUsers.findOneAndUpdate(
						{ userId: data.userId },
						{ $push: { roomsArray: roomId } },
						(err3, data3) => {
							if (err3) {
								console.log(err);
							}
						}
					);

					mongoUsers.findOneAndUpdate(
						{ userId: req.body.userId },
						{ $push: { roomsArray: roomId } },
						{ returnOriginal: false },
						(err3) => {
							if (err3) {
								console.log(err);
							}
						}
					);
				}
			});
		}
	});
});

router.post("/create/groupRoom", (req, res) => {
	const roomData = {
		title: req.body.title,
		usersArray: [req.body.userId],
	};

	mongoRooms.create(roomData, (err2, data2) => {
		if (err2) {
			res.status(500).send("Unable to create Room");
		} else {
			const roomId = data2._id;
			mongoUsers.findOneAndUpdate(
				{ userId: req.body.userId },
				{ $push: { roomsArray: roomId } },
				{ returnOriginal: false },
				(err3, data3) => {
					if (err3) console.log(err);
				}
			);
		}
	});
});

// Retrieve all User Rooms
router.get("/retrieve/rooms", (req, res) => {
	mongoUsers.findOne({ userId: req.query.userId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else if (data) {
			res.status(200).send({
				roomId: data._id,
				title: data.title,
				usersArray: data.usersArray,
			});
		}
	});
});

// Retrieve Rooms Data
router.get("/retrieve/roomData", (req, res) => {
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else if (data) {
			data.messagesArray.sort((a, b) => b.timestamp - a.timestamp)
			res.send(data);
		}
	});
});

// Upload New Message to Room
router.post("/upload/message", (req, res) => {
	mongoRooms.findOneAndUpdate(
		{ _id: req.body.roomId },
		{ $push: { messagesArray: req.body.data } },
		{ returnOriginal: false },
		(err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.status(201).send(data);
			}
		}
	);
});

// Retrieve Messages from Room
router.get("/retrieve/messages", (req, res) => {
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

// Delete Message from Room
router.get("/delete/message", (req, res) => {
	mongoRooms.findOneAndUpdate(
		{ _id: req.query.roomId },
		{ $pull: { messagesArray: { _id: req.query.messageId } } },
		{ returnOriginal: false },
		(err, data) => {
			if (err) console.log(err);
		}
	);
});

// Add Member to Room
router.get("/update/room/addMember", (req, res) => {
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			mongoUsers.findOne({ email: req.query.email }, (err2, data2) => {
				if (err2) {
					console.log(err2);
				} else if (data.usersArray.includes(data2.userId)) {
					res.send("Error");
				} else {
					mongoUsers.findOneAndUpdate(
						{ email: req.query.email },
						{ $push: { roomsArray: req.query.roomId } },
						{ returnOriginal: false },
						(err2, data3) => {
							if (err2) {
								console.log(err2);
							} else if (data3 === null) {
								res.send(data3);
							} else {

								const messageData = {
									replyId: 'AAAAA',
									content: data3.name + ' has been Added',
									timestamp: Date.now()
								}

								mongoRooms.findOneAndUpdate(
									{ _id: req.query.roomId },
									{ $push: { usersArray: data3.userId, messagesArray: messageData } },
									(err4) => {
										if (err4) {
											res.status(500).send(err4);
										}
									}
								);

								res.send(data3.roomsArray);
							}
						}
					);
				}
			});
		}
	});
});

// Remove Member from GroupRoom
router.get("/update/room/removeMember", (req, res) => {
	mongoUsers.findOneAndUpdate(
		{ userId: req.query.userId },
		{ $pull: { roomsArray: req.query.roomId } },
		{ returnOriginal: false },
		(err1, removedUser) => {
			if (err1) {
				console.log(err1)
			} else {

				const messageData = {
					replyId: 'AAAAA',
					content: removedUser.name + ' Left',
					timestamp: Date.now()
				}

				mongoRooms.findOneAndUpdate(
					{ _id: req.query.roomId },
					{ $pull: { usersArray: req.query.userId } },
					(err2, data) => {
						if (err2) {
							console.log(err2)
						} else if (data.usersArray.length <= 1) {
							mongoRooms.findOneAndDelete(
								{ _id: req.query.roomId },
								(err2, dataRoom) => {
									if (err2) console.log(err2);
									else {
										res.send(dataRoom);
									}
								}
							);
						} else {
							mongoRooms.findOneAndUpdate(
								{ _id: req.query.roomId },
								{ $push: { messagesArray: messageData } },
								(err2, dataRoom) => {
									if (err2) console.log(err2);
									else {
										res.send(dataRoom);
									}
								}
							);
						}
					}
				);
			}
		}
	);
});

// Remove DirectRoom
router.get("/update/room/removeDirectRoom", (req, res) => {
	const roomId = req.query.roomId;

	mongoRooms.findOneAndUpdate(
		{ _id: roomId },
		{ $pull: { usersArray: req.query.userId } },
		(err, data) => {
			if (err) console.log(err);
			else {

				data.usersArray.map((userId) => {
					return mongoUsers.findOneAndUpdate(
						{ userId: userId },
						{ $pull: { roomsArray: roomId } },
						(err1, data) => {
							if (err1) console.log(err1);
						}
					);
				});

				mongoRooms.findOneAndDelete(
					{ _id: req.query.roomId },
					(err2, dataRoom) => {
						if (err2) console.log(err2);
						else {
							res.send(dataRoom);
						}
					}
				);
			}
		}
	);
});

export default router;
