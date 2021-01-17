import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'
import mongoRooms from '../Models/mongoRooms.js'

const router = express.Router()

// Retrieve all User Rooms
router.get('/retrieve/rooms', (req, res) => {
    mongoUsers.findOne(
        { userId: req.query.userId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }

        })
})

// Retrieve Rooms Data
router.get('/retrieve/roomData', (req, res) => {
    mongoRooms.findOne({ _id: req.query.roomId },
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
    mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(data)
        }
    })
})

export default router