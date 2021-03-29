import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";

import * as socketIo from "socket.io";

import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema"

// Configuring App
const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Setting up Middleware
app.use(cors());

// Setting up Listener
const server = app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

// Setting up Socket

// Configuring Mongo DB
const mongoURI: string = process.env.URI as string;
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB Server");
});

// Configuring Graph QL API
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
