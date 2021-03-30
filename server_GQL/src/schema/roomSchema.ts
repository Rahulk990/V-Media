import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import Room from "../models/room";
import User from "../models/user";

import { UserType } from "./userSchema";

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    replyId: { type: GraphQLID },
    username: { type: GraphQLString },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const RoomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    messagesArray: { type: GraphQLList(MessageType) },
    users: {
      type: GraphQLList(UserType),
      resolve(parent: any, args: any) {
        return User.find({ _id: { $in: parent.usersArray } });
      },
    },
  }),
});

const RoomRootQuery = {
  room: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Room.findById({ _id: args.id });
    },
  },
};

const RoomMutation = {
  addDirectRoom: {
    type: RoomType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      userEmail: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
    },
    resolve(parent: any, args: any) {
      let secondUser: any = User.find({ email: args.userEmail });
      if (secondUser && secondUser._id !== args.userId) {
        let room = new Room({
          title: args.title,
          usersArray: [args.userId, secondUser._id],
        });
        return room.save();
      } else {
        return null;
      }
    },
  },

  deleteDirectRoom: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Room.findByIdAndDelete(args.id);
    },
  },

  addGroupRoom: {
    type: RoomType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let room = new Room({
        title: args.title,
        usersArray: [args.userId],
      });
      return room.save();
    },
  },

  addMember: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userEmail: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let secondUser: any = User.find({ email: args.userEmail });
      if (secondUser) {
        let message = {
          replyId: "AAAAA",
          content: secondUser.name + " has been Added",
          timestamp: Date.now(),
        };
        return Room.findByIdAndUpdate(
          args.id,
          { $push: { usersArray: secondUser._id, messagesArray: message } },
          { returnOriginal: false }
        );
      } else {
        return null;
      }
    },
  },

  deleteMember: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let message = {
        replyId: "AAAAA",
        content: args.username + " has been Added",
        timestamp: Date.now(),
      };

      let update = {
        $pull: { usersArray: args.userId },
        $push: { messagesArray: message },
      };

      let room: any = Room.findByIdAndUpdate(args.id, update, {
        returnOriginal: false,
      });

      if (room.usersArray.length == 0) {
        return Room.findByIdAndDelete(args.id);
      } else {
        return room;
      }
    },
  },

  addMessage: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
      replyId: { type: GraphQLID },
    },
    resolve(parent: any, args: any) {
      let message = {
        userId: args.userId,
        username: args.username,
        content: args.content,
        timestamp: args.timestamp,
        replyId: args.replyId,
      };
      return Room.findByIdAndUpdate(
        args.id,
        { $push: { messagesArray: message } },
        { returnOriginal: false }
      );
    },
  },

  deleteMessage: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      messageId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      let update = {
        $pull: { messagesArray: { _id: args.messageId } },
      };
      return Room.findByIdAndUpdate(args.id, update, { returnOriginal: false });
    },
  },
};

export { RoomType, RoomRootQuery, RoomMutation };
