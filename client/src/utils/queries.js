import { gql } from "@apollo/client";

export const QUERY_TODO = gql`
query todo {
  todos {
    _id
    title
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
