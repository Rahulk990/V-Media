import graphql, {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
// import _ from "lodash";

import User from "../models/user";
import Post from "../models/post";

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    userId: { type: GraphQLString },
    text: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    likesArray: { type: GraphQLList(GraphQLString) },
    commentsArray: { type: GraphQLList(CommentType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        imgUrl: { type: GraphQLString },
        timestamp: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let post = new Post({
          userId: args.userId,
          text: args.text,
          imgUrl: args.imgUrl,
          timestamp: args.timestamp,
        });
        return post.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
