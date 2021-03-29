import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import User from "../models/user";
import Post from "../models/post";

import { PostType } from "./postSchema";

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    heading: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const UserType: any = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
    email: { type: GraphQLString },
    eventsArray: { type: GraphQLList(EventType) },
    userPosts: {
      type: GraphQLList(PostType),
      resolve(parent: any, args: any) {
        return Post.find({ userId: parent._id });
      },
    },
  }),
});

const UserRootQuery = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parent: any, args: any) {
      return User.findById(args.id);
    },
  },
};

const UserMutation = {
  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      avatar: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let user = new User({
        name: args.name,
        avatar: args.avatar,
        email: args.email,
      });
      return user.save();
    },
  },
};

export { UserType, UserRootQuery, UserMutation };
