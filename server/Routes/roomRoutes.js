import express from 'express'
import mongoUsers from '../Models/mongoUsers.js'

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




// app.get('/retrieve/roomsData', (req, res) => {
//     (async function () {
//         var roomsData = []
//         const roomIds = req.query.roomIds

//         if (roomIds) {
//             for (let i = 0; i <= roomIds.length; i++) {
//                 await mongoRooms.findOne({ _id: roomIds[i] }, (err, data) => {
//                     if (err || (data == null)) {
//                         // console.log(err)
//                     } else {
//                         roomsData.push({
//                             roomId: data._id,
//                             title: data.title,
//                             usersArray: data.usersArray
//                         })
//                     }
//                 })
//             }
//         }

//         res.send(roomsData)
//     })();
// })

export default router