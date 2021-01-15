// Importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as socketIo from 'socket.io'
import mongoPosts from './mongoPosts.js'
import mongoUsers from './mongoUsers.js'
import mongoRooms from './mongoRooms.js'
import Pusher from 'pusher'
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
//==messenger
// app.use((req, res, next) =>{
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// })
//==messenger

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

    if (change.operationType === 'insert') {
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

app.post('/upload/post', (req, res) => {
  const dbPost = req.body;
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/retrieve/posts', (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      data.sort((a, b) => { return b.timestamp - a.timestamp })
      res.send(data)
    }
  })
})

app.post('/upload/event', (req, res) => {
  mongoUsers.findOneAndUpdate(
    { userId: req.body.userId },
    { $push: { eventsArray: req.body.data } },
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

app.get('/retrieve/events', (req, res) => {
  mongoUsers.findOne({ userId: req.query.userId }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data.eventsArray)
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
            { $push: { roomsArray: roomId } },
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

app.get('/retrieve/rooms', (req, res) => {
  mongoUsers.findOne({ userId: req.query.userId }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data.roomsArray)
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


app.get('/retrieve/roomsData', (req, res) => {
  (async function () {
    var roomsData = []
    const roomIds = req.query.roomIds

    if (roomIds) {
      for (let i = 0; i <= roomIds.length; i++) {
        await mongoRooms.findOne({ _id: roomIds[i] }, (err, data) => {
          if (err || (data == null)) {
            // console.log(err)
          } else {
            roomsData.push({
              roomId: data._id,
              title: data.title,
              usersArray: data.usersArray
            })
          }
        })
      }
    }

    res.send(roomsData)
  })();
})