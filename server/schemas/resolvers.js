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
      return Todos.find({ user: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
      },
    todo: async (parent, { id }, context) => {
      if (context.user) {
      return Todos.findOne({ _id: id, user: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
      },
    items: async (parent, args, context) => {
      if (context.user) {
      return Items.find({ user: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
      },
    item: async (parent, { id }, context) => {
      if (context.user) {
      return Items.findOne({ _id: id, user: context.user._id });
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
    createTodo: async (parent, { name }, context) => {
      if (context.user) {
        return Todos.create({ name, user: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createItem: async (parent, { todoId, name, priority, dateCreated, dueDate }, context) => {
      if (context.user) {
        return Items.create({
          todoId,
          name,
          priority,
          dateCreated,
          dueDate,
          user: context.user._id
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
