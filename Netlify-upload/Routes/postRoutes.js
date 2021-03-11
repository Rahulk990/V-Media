import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'
import mongoPosts from '../Models/mongoPosts.js'

const router = express.Router()

// Upload New Post
router.post('/upload/post', (req, res) => {
    mongoPosts.create(req.body, (err, data) => {

        if (err) {
            res.status(500).send(err)
        } else if (data) {
            res.redirect('userPost/?userId=' + req.body.userId + '&postId=' + data._id)
        }

    })
})

// Retrieve all Posts
router.get('/retrieve/posts', (req, res) => {
    mongoPosts.find(
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else if (data) {
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

// Retrieve Post Data
router.get('/retrieve/postData', (req, res) => {
    mongoPosts.findOne({ _id: req.query.postId },
        (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                res.send(data)
            }

        })
})


// Add Like to Post
router.get('/update/post/addLike', (req, res) => {
    mongoPosts.findOneAndUpdate(
        { _id: req.query.postId },
        { $push: { likesArray: req.query.userId } },
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

// Remove Like from Post
router.get('/update/post/removeLike', (req, res) => {
    mongoPosts.findOneAndUpdate(
        { _id: req.query.postId },
        { $pull: { likesArray: req.query.userId } },
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

// Add Comment to Post
router.post('/update/post/addComment', (req, res) => {
    mongoPosts.findOneAndUpdate(
        { _id: req.body.postId },
        { $push: { commentsArray: req.body.commentData } },
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

// Remove Comment from Post
router.get('/update/post/removeComment', (req, res) => {
    mongoPosts.findOneAndUpdate(
        { _id: req.query.postId },
        { $pull: { commentsArray: { _id: req.query.commentId } } },
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