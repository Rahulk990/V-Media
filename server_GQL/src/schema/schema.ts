import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { merge } from "lodash";

import {UserRootQuery, UserMutation} from "./userSchema"
import {PostRootQuery, PostMutation} from "./postSchema"

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: merge(UserRootQuery, PostRootQuery),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: merge(UserMutation, PostMutation),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
