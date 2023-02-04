import { gql } from "@apollo/client";

export const QUERY_TODO = gql`
query todo {
  todos {
    _id
    title
    arrange
    items {
      _id
      description
      completed
      priority
      dateCreated
      dueDate
    }
  }
}
`;
