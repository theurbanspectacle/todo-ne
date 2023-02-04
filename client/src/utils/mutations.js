import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const NEW_TODO = gql`
  mutation createTodo($title: String!, $arrange: Int!) {
    createTodo(title: $title, arrange: $arrange) {
      _id
      title
      arrange
    }
  }
`;

export const NEW_TODO_ITEM = gql`
  mutation createItem($todoId: ID!, $description: String!, $priority: Int!, $dueDate: String, $completed: Boolean) {
    createItem(todoId: $todoId, description: $description, priority: $priority, dueDate: $dueDate, completed: $completed) {
      _id
      description
      priority
      dueDate
      dateCreated
    }
  }
`;

export const EDIT_TODO_ITEM = gql`
  mutation updateItem($itemId: ID!, $description: String!, $priority: Int!, $dueDate: String, $completed: Boolean!) {
    updateItem(itemId: $itemId, description: $description, priority: $priority, dueDate: $dueDate, completed: $completed) {
      _id
      description
      completed
      priority
      dueDate
    }
  }
`;

export const DELETE_TODO_ITEM = gql`
  mutation deleteItem($itemId: ID!) {
    deleteItem(itemId: $itemId) {
      _id
    }
  }
`;

export const EDIT_TODO = gql`
  mutation updateTodo($todoId: ID!, $title: String!, $arrange: Int!) {
    updateTodo(todoId: $todoId, title: $title, arrange: $arrange) {
      _id
      title
      arrange
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      _id
    }
  }
`;
