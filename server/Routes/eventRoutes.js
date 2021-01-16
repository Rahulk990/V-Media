import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'

const router = express.Router()

router.post('/upload/event', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.body.userId },
        { $push: { eventsArray: req.body.data } },
        { returnOriginal: false },
        (err, data) => {

            console.log(data)
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }

        }
    )
})

router.get('/retrieve/events', (req, res) => {
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

router.get('/delete/event', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.query.userId },
        { $pull: { eventsArray: { _id: req.query.eventId } } },
        { returnOriginal: false },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }

        }
    )
})

export default router