import { gql } from '@apollo/client';

export const TEST_QUERY = gql``;
const GET_ISSUES = gql`
  query {
    search(
      query: "repo:morajabi/styled-media-query is:issue"
      type: ISSUE
      first: 5
    ) {
      issueCount
      nodes {
        ... on Issue {
          number
          title
        }
      }
    }
  }
`;
