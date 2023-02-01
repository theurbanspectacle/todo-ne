// todo: async (parent, { id }, context) => {
//       if (context.user) {
//       return Todo.findOne({ _id: id, user: context.user._id });
//       }
//       throw new AuthenticationError("You need to be logged in!");
//       },
//     items: async (parent, args, context) => {
//       if (context.user) {
//       return Item.find({ user: context.user._id });
//       }
//       throw new AuthenticationError("You need to be logged in!");
//       },
//     item: async (parent, { id }, context) => {
//       if (context.user) {
//       return Item.findOne({ _id: id, user: context.user._id });
//       }
//       throw new AuthenticationError("You need to be logged in!");
//       },
