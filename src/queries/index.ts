import { gql } from "@apollo/client";

export const GET_TOPICS = gql`
  query Topic($name: String!) {
    topic(name: $name) {
      name
      relatedTopics(first: 10) {
        ... on Topic {
          __typename
          name
          stargazerCount
        }
      }
      stargazerCount
    }
  }
`;
