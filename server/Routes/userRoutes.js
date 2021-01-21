import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'

const router = express.Router()

// Upload User Data
router.post('/upload/user', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.body.userId }, req.body,
        { returnOriginal: false, upsert: true },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else if (data) {
                res.status(201).send(data)
            }
        })
})

// Retrieve User Data
router.get('/retrieve/user', (req, res) => {
    mongoUsers.findOne(
        { userId: req.query.userId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else if (data) {
                res.send(data)
            }

        })
})

export default router