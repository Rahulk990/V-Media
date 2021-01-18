import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'
import mongoRooms from '../Models/mongoRooms.js'

const router = express.Router()

// Create New Direct Room
router.post('/create/directRoom', (req, res) => {
    mongoUsers.findOne({ email: req.body.userEmail }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else if (data === null) {
            res.send(data);
        }
        else {

            const roomData = { usersArray: [req.body.userId, data.userId] }
            mongoRooms.create(roomData,
                (err2, data2) => {
                    if (err2) {
                        res.status(500).send(err2)
                    } else {

                        const roomId = data2._id
                        mongoUsers.findOneAndUpdate(
                            { userId: data.userId },
                            { $push: { roomsArray: roomId } },
                            (err3) => {
                                if (err3) {
                                    console.log(err)
                                }
                            }
                        )

                        mongoUsers.findOneAndUpdate(
                            { userId: req.body.userId },
                            { $push: { roomsArray: roomId } }, { returnOriginal: false },
                            (err3) => {
                                if (err3) {
                                    console.log(err)
                                }
                            }
                        )

                    }
                })
        }
    })
})

// Retrieve all User Rooms
router.get('/retrieve/rooms', (req, res) => {
    mongoUsers.findOne(
        { userId: req.query.userId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send({
                    roomId: data._id,
                    title: data.title,
                    usersArray: data.usersArray
                })
            }

        })
})

// Retrieve Rooms Data
router.get('/retrieve/roomData', (req, res) => {
    mongoRooms.findOne(
        { _id: req.query.roomId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.send(data)
            }

        })
})

// Upload New Message to Room
router.post('/upload/message', (req, res) => {
    mongoRooms.findOneAndUpdate(
        { _id: req.body.roomId },
        { $push: { messagesArray: req.body.data } },
        { returnOriginal: false },
        (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.status(201).send(data)
            }
        }
    )
})

// Upload Messages from Room
router.get('/retrieve/messages', (req, res) => {
    mongoRooms.findOne(
        { _id: req.query.roomId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.send(data)
            }

        })
})

export default router