import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'

const router = express.Router()

// Upload New Event
router.post('/upload/event', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.body.userId },
        { $push: { eventsArray: req.body.data } },
        { returnOriginal: false },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else if (data) {
                res.status(201).send(data)
            }

        }
    )
})

// Retrieve all User Events
router.get('/retrieve/events', (req, res) => {
    mongoUsers.findOne(
        { userId: req.query.userId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else if (data) {
                res.status(200).send(data)
            }

        })
})

// Delete User Event
router.get('/delete/event', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.query.userId },
        { $pull: { eventsArray: { _id: req.query.eventId } } },
        { returnOriginal: false },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else if (data) {
                res.status(201).send(data)
            }

        }
    )
})

export default router