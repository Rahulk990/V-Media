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
      console.log(change);
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages','inserted',
        {
          title:  messageDetails.title, // Title
          roomId: messageDetails.roomId,
          type:   messageDetails.type,
          usersArray: messageDetails.usersArray, // Users Ids
          messagesArray: messageDetails.messagesArray  
        }
      );
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

//------------ messenger-----

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;
  mongoRooms.create(dbMessage, (err, data) => {
    if (err) console.log(err);
    else {
      res.status(201).send(`New message created: \n ${data}`)
    }
  })
})
 
app.get('/messages/sync', (req, res) => {
  mongoRooms.find((err, data) => {
    if (err) console.log(err);
    else {
      res.status(200).send(data);
    }
  })
})
