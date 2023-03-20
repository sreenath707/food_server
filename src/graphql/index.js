let graphql = require("graphql");
const userModel = require("../models/user");
const foodModel = require("../models/food");

const {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const FoodType = new GraphQLObjectType({
  name: "Food",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    cost: { type: GraphQLInt },
    image: { type: GraphQLString },
    rating: { type: GraphQLFloat },
  }),
});

const root = new GraphQLObjectType({
  name: "root",
  fields: () => ({
    user: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve: async (parent, args) => {
        let data = await userModel.findOne({ username: args.username });
        return data;
      },
    },
    food: {
      type: new GraphQLList(FoodType),
      resolve: async (parent, args) => {
        return await foodModel.find({});
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    AddFood: {
      type: FoodType,
      args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        cost: {type: GraphQLInt},
        rating: {type: GraphQLFloat},
      },
      resolve: async (parent,args)=>{
        console.log("buhahah");
        await foodModel.insertMany([args]);
        console.log("food inserted");
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: root,
  mutation: mutation,
});
