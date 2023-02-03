const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    todos: [Todo]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Todo {
    _id: ID
    title: String
    items: [Item]
  }

  type Item {
    _id: ID
    description: String
    completed: Boolean
    priority: Int
    dateCreated: String
    dueDate: String
    todo: Todo
    user: User
  } 

  type Query {
    me: User
    todos: [Todo]
    todo(id: ID!): Todo
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createTodo(title: String!): Todo

    createItem(todoId: ID!, description: String!, priority: Int!, dateCreated: String, dueDate: String, completed: Boolean): Item

    updateItem(itemId: ID!, description: String!, priority: Int!, dueDate: String, completed: Boolean!): Item
    
    updateTodo(todoId: ID!, title: String!): Todo

    deleteItem(itemId: ID!): Item

    deleteTodo(todoId: ID!): Todo
  }
`;

module.exports = typeDefs;
