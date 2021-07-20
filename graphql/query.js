import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    user(login: "nbr41to") {
      id
      email
      repositories {
        totalCount
      }
      starredRepositories {
        totalCount
      }
    }
  }
`;

export const GET_ISSUES = gql`
  query {
    search(
      query: "repo:prog-learning/lesson-github-api-graphql is:issue"
      type: ISSUE # DISCUSSION, REPOSITORY, ISSUE, USER
      first: 5
    ) {
      issueCount
      nodes {
        ... on Issue {
          id
          number
          title
          bodyText
        }
      }
    }

    # APIの仕様状況も取得できる
    rateLimit {
      limit # 上限
      cost # かかったコスト
      remaining # あと何回できるか
      resetAt #リセットまでの時間
    }
  }
`;

export const GET_ISSUE = gql`
  query FindIssueID($issueId: Int!) {
    repository(owner: "prog-learning", name: "lesson-github-api-graphql") {
      issue(number: $issueId) {
        id
        title
        comments(first: 10) {
          nodes {
            id
            body
          }
        }
      }
    }
  }
`;
