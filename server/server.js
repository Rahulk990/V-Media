// Importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as socketIo from 'socket.io'
import Pusher from 'pusher'

import eventRoutes from './Routes/eventRoutes.js'
import postRoutes from './Routes/postRoutes.js'
import roomRoutes from './Routes/roomRoutes.js'

import mongoPosts from './Models/mongoPosts.js'
import mongoUsers from './Models/mongoUsers.js'
import mongoRooms from './Models/mongoRooms.js'

// App Config
const app = express()
const port = process.env.PORT || 8000

// -----pusher-------
const pusher = new Pusher({
  appId: "1138234",
  key: "d24ba3df0d30f4d2c95e",
  secret: "e367a842ed6aa6866991",
  cluster: "ap2",
  useTLS: true
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Listener
const server = app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

// Socket Setup

const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('User Connected')

  socket.emit('temp', {
    data: 'ABCD'
  }, 1000)

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})

// DB Config
const mongoURI = 'mongodb+srv://admin:KsDmm1u8B2RKgKCj@cluster0.f9hlo.mongodb.net/fbdb?retryWrites=true&w=majority'
mongoose.set('useFindAndModify', false);

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('DB Connected')

  const changeStream = mongoose.connection.collection('posts').watch()
  changeStream.on('change', (change) => {

    if (change.operationType === 'insert' || change.operationType === 'delete') {
      io.emit('refresh', { body: 'DB Changed' })
    } else {
      console.log('Error Triggering Pusher')
    }

  })
  //-----messenger------
  const msgCollection = mongoose.connection.collection("rooms");
  const changeStream1 = msgCollection.watch();
  changeStream1.on('change', (change) => {
    if (change.operationType === 'insert') {
      pusher.trigger('messages', 'inserted', 'Update Rooms');
    } else if (change.operationType === 'update') {
      pusher.trigger('messages', 'updated', 'Update Messages');
    }
  })
})

// API Routes
app.use(eventRoutes);
app.use(postRoutes);
app.use(roomRoutes);

app.post('/upload/user', (req, res) => {
  mongoUsers.findOneAndUpdate(
    { userId: req.body.userId }, req.body,
    { returnOriginal: false, upsert: true },
    (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
})

app.get('/retrieve/user', (req, res) => {
  mongoUsers.findOne({ userId: req.query.userId }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send({
        name: data.name,
        avatar: data.avatar
      })
    }
  })
})

app.post('/create/roomContact', (req, res) => {
  mongoUsers.findOne({ email: req.body.userEmail }, (err, data) => {
    if (err || (data === null)) {
      res.send('No such user exists!')
    } else {

      const roomData = {
        usersArray: [req.body.userId, data.userId]
      }

      mongoRooms.create(roomData, (err2, data2) => {
        if (err2) {
          res.status(500).send('Unable to create Room')
        } else {
          const roomId = data2._id
          mongoUsers.findOneAndUpdate(
            { userId: data.userId },
            { $push: { roomsArray: roomId } },
            (err3, data3) => {
              if (err3) {
                console.log(err)
              }
            }
          )
          
          mongoUsers.findOneAndUpdate(
            { userId: req.body.userId },
            { $push: { roomsArray: roomId } },{returnOriginal:false},
            (err3, data3) => {
              if (err3) {
                console.log(err)
              } else {
                res.status(201).send(data3.roomsArray)
              }
            }
          )

        }
      })
    }
  })
})

app.post('/create/roomGroup', (req, res) => {
  const roomData = {
    title: req.body.title,
    usersArray: [req.body.userId]
  }

  mongoRooms.create(roomData, (err2, data2) => {
    if (err2) {
      res.status(500).send('Unable to create Room')
    } else {
      const roomId = data2._id
      mongoUsers.findOneAndUpdate(
        { userId: req.body.userId },
        { $push: { roomsArray: roomId } },
        { returnOriginal: false },
        (err3, data3) => {
          if (err3) {
            console.log(err)
          } else {
            res.status(201).send(data3.roomsArray)
          }
        }
      )

    }
  })
})

app.post('/upload/message', (req, res) => {
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

app.get('/retrieve/messages', (req, res) => {
  mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data)
    }
  })
})


