import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'
import mongoPosts from '../Models/mongoPosts.js'

const router = express.Router()

// Upload New Post
router.post('/upload/post', (req, res) => {
    mongoPosts.create(req.body, (err, data) => {

        if (err) {
            res.status(500).send(err)
        } else {
            res.redirect('userPost/?userId=' + req.body.userId + '&postId=' + data._id)
        }

    })
})

// Retrieve all Posts
router.get('/retrieve/posts', (req, res) => {
    mongoPosts.find((err, data) => {

        if (err) {
            res.status(500).send(err)
        } else {
            data.sort((a, b) => { return b.timestamp - a.timestamp })
            res.send(data)
        }

    })
})

// Delete Post
router.get('/delete/post', (req, res) => {
    mongoPosts.deleteOne({ _id: req.query.postId },
        (err) => {
            if (err) { console.log(err) }
        });
    res.redirect('userPost/?userId=' + req.query.userId + '&postId=' + req.query.postId)
})


// Add PostId to User
router.get('/upload/userPost', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.query.userId },
        { $push: { postsArray: req.query.postId } },
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

// Retrieve Posts Posted by User
router.get('/retrieve/userPosts', (req, res) => {
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

// Delete PostId from User
router.get('/delete/userPost', (req, res) => {
    mongoUsers.findOneAndUpdate(
        { userId: req.query.userId },
        { $pull: { postsArray: req.query.postId } },
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