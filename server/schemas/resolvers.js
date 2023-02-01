const { AuthenticationError } = require("apollo-server-express");
const { User, Items, Todos } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    todos: async (parent, args, context) => {
      if (context.user) {
       const user = await User.findById(context.user._id).populate({
        path: "todos",
        populate: {
          path: "items",
          model: "Item"
        }
       })
       return user.todos
      }
      throw new AuthenticationError("You need to be logged in!");
      },
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    createTodo: async (parent, { title }, context) => {
      if (context.user) {
        const todo = await Todos.create({ title, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { todos: todo._id } })
        return todo
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createItem: async (parent, { todoId, description, priority }, context) => {
      if (context.user) {
        try {
        const item = await Items.create({
          todo: todoId,
          description,
          priority,
          user: context.user._id
        });
        await Todos.findByIdAndUpdate(todoId, { $push: { items: item._id } })
        return item
      } catch (err) {
        console.log(err)
      }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
