const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Todos {
    _id: ID
    name: String
    items: [Item]
  }

  type Item {
    _id: ID
    description: String
    completed: Boolean
    priority: Int
    dateCreated: String
    dueDate: String
  } 

  type Query {
    me: User
    todos: [Todos]
    todo(id: ID!): Todos
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createTodo(title: String!): Todo
    createItem(todoId: ID!, description: String!, priority: Int, dateCreated: String, dueDate: String): Item
  }
`;

module.exports = typeDefs;
