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


Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9lc21pdGhAZ21haWwuY29tIiwibmFtZSI6ImpvZSBzbWl0aCIsIl9pZCI6IjYzZGFkZjI3NjEyYTI0MmZmMDUxZWNiNSJ9LCJpYXQiOjE2NzUyODgzNTksImV4cCI6MTY3NTI5NTU1OX0.RXrvPq2LHygAPyvdDV-q14YY6lqpltjYFRy_d7THvno

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9lc21pdGhAZ21haWwuY29tIiwibmFtZSI6ImpvZSBzbWl0aCIsIl9pZCI6IjYzZGFkZjI3NjEyYTI0MmZmMDUxZWNiNSJ9LCJpYXQiOjE2NzUzNjE4MTUsImV4cCI6MTY3NTM2OTAxNX0.U7eun5loZSXAXuww5-h4D2g3tCB-oYyoms-Tum20WlQ

  // updateItem: async (parent, { todoId, description, completed, priority, dateCreated, dueDate }, context) => {
  //     if (context.user) { 
  //       try {
  //         const item =  await Items.findByIdAndUpdate({_id: itemId, user: context.user._id}, {$set: {description, completed, priority, dateCreated, dueDate}}, {new: true});
  //         return item
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     throw new AuthenticationError("You need to be logged in!");
  //   },


  // deleteItem: async(parent, {itemId}, context) => {
  //     if (context.user) {
  //       try {
  //         const item = await Items.findByIdAndDelete({_id: itemId, user: context.user._id});
  //         await Todos.findByIdAndUpdate(todoId, { $push: { items: item._id } });
  //         return item;
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //   throw new AuthenticationError("You need to be logged in!");
  //   },
